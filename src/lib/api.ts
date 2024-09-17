import { Session } from "@/app/types/session";
import { ApiError } from "@/app/types/api-error";

type ApiRequestProps = {
    /**
     * The endpoint to send the request to.
     */
    endpoint: string;

    /**
     * The session to authenticate with, if any.
     */
    session?: Session | undefined;

    /**
     * The method of the request to make.
     */
    method?: string | undefined;

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
                ...(session
                    ? {
                          Authorization: `Bearer ${session.accessToken}`,
                      }
                    : {}),
            },
        }
    );
    const data: T = await response.json();
    if (response.status !== 200) {
        return { data: undefined, error: data as ApiError };
    }
    return { data: data as T, error: undefined };
};
