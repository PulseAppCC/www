import { Session } from "@/app/types/user/session";
import { ApiError } from "@/app/types/api-error";
import { parseJson } from "@/lib/json";

type ApiRequestProps = {
    /**
     * The endpoint to send the request to.
     */
    endpoint: string;

    /**
     * The method of the request to make.
     */
    method?: string | undefined;

    /**
     * The session to authenticate with, if any.
     */
    session?: Session | undefined;

    /**
     * The optional body of the request.
     */
    body?: any | undefined;
};

/**
 * Send a request to the API.
 *
 * @param endpoint the endpoint to request
 * @param session the session to auth with
 * @param body the optional request body to send
 * @param method the request method to use
 * @return the api response
 */
export const apiRequest = async <T>({
    endpoint,
    method,
    session,
    body,
}: ApiRequestProps): Promise<{
    data: T | undefined;
    error: ApiError | undefined;
}> => {
    // Build the request headers
    let headers: HeadersInit = {
        "Content-Type": `application/${method === "POST" ? "x-www-form-urlencoded" : "json"}`,
    };
    if (session) {
        headers = {
            ...headers,
            Authorization: `Bearer ${session.accessToken}`,
        };
    }

    // Send the request
    const response: Response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}${endpoint}`,
        {
            method: method ?? "GET",
            body:
                method === "POST" && body
                    ? new URLSearchParams(body)
                    : undefined,
            headers,
        }
    );

    // Parse the Json response from the API
    const json: any = parseJson(await response.text());
    if (response.status !== 200) {
        return { data: undefined, error: json as ApiError };
    }
    return { data: json as T, error: undefined };
};
