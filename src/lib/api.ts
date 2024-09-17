/**
 * Send a request to the API.
 *
 * @param endpoint the endpoint to request
 * @param body the optional request body to send
 * @param method the request method to use
 */
export const apiRequest = async <T>(
    endpoint: string,
    method?: string | undefined,
    body?: any | undefined
): Promise<{ data: T | undefined; error: ApiError | undefined }> => {
    const response: Response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}${endpoint}`,
        {
            method: method ?? "GET",
            body:
                method === "POST" && body
                    ? new URLSearchParams(body)
                    : undefined,
            headers: {
                "Content-Type": `application/${method === "POST" ? "x-www-form-urlencoded" : "json"}`,
            },
        }
    );
    const data: T = await response.json();
    if (response.status !== 200) {
        return { data: undefined, error: data as ApiError };
    }
    return { data: data as T, error: undefined };
};

import { ApiError } from "@/app/types/api-error";
