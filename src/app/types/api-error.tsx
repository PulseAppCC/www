/**
 * An error from the API.
 */
export type ApiError = {
    /**
     * The status of this error.
     */
    status: string;

    /**
     * The HTTP code of this error.
     */
    code: number;

    /**
     * The message for this error.
     */
    message: string;

    /**
     * The timestamp of this error.
     */
    timestamp: Date;
};
