/**
 * A device logged into a
 * {@link User}'s account.
 */
export type Device = {
    /**
     * The type of this device.
     */
    type: "DESKTOP" | "TABLET" | "PHONE" | "UNKNOWN";

    /**
     * The browser type of this device.
     */
    browserType:
        | "FIREFOX"
        | "EDGE"
        | "CHROME"
        | "SAFARI"
        | "SAMSUNGBROWSER"
        | "UNKNOWN";

    /**
     * The IP address of this device.
     */
    ip: string;

    /**
     * The location of this device, if known.
     */
    location: string | undefined;

    /**
     * The user agent of this device.
     */
    userAgent: string;

    /**
     * The session snowflake associated with this device.
     */
    sessionSnowflake: string;

    /**
     * The date this device first logged into the account.
     */
    firstLogin: Date;
};
