/**
 * Flags for a {@link User}.
 */
export enum UserFlag {
    /**
     * The user is disabled.
     */
    DISABLED = 0,

    /**
     * The user completed the onboarding process.
     */
    COMPLETED_ONBOARDING = 1,

    /**
     * The user has two-factor auth enabled.
     */
    TFA_ENABLED = 2,

    /**
     * The user is an administrator.
     */
    ADMINISTRATOR = 3,
}
