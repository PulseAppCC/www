export type User = {
    /**
     * The snowflake id of this user.
     */
    snowflake: `${bigint}`;

    /**
     * This user's email.
     */
    email: string;

    /**
     * This user's username.
     */
    username: string;

    /**
     * The tier of this user.
     */
    tier: "FREE";

    /**
     * The flags for this user.
     */
    flags: number;

    /**
     * The date this user last logged in.
     */
    lastLogin: Date;

    /**
     * The date this user was created.
     */
    created: Date;
};
