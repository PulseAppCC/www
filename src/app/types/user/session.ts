/**
 * A session of a {@link User}.
 */
export type Session = {
    /**
     * The access token for this session.
     */
    accessToken: string;

    /**
     * The refresh token for this session.
     */
    refreshToken: string;

    /**
     * The unix time this session expires.
     */
    expires: bigint;
};
