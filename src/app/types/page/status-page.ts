/**
 * A status page owned by an {@link Organization}.
 */
export type StatusPage = {
    /**
     * The snowflake id of this status page.
     */
    snowflake: bigint;

    /**
     * The name of this status page.
     */
    name: string;

    /**
     * The slug of this status page.
     */
    slug: string;

    /**
     * The description of this status page, if any.
     */
    description: string | undefined;

    /**
     * The hash to the logo of this status page, if any.
     */
    logo: string | undefined;

    /**
     * The hash to the banner of this status page, if any.
     */
    banner: string | undefined;

    /**
     * The theme of this status page.
     */
    theme: "AUTO" | "DARK" | "LIGHT";

    /**
     * Whether this status page is visible in search engines.
     */
    visibleInSearchEngines: boolean;

    /**
     * The snowflake of the {@link Organization}
     * that owns this status page.
     */
    orgSnowflake: boolean;
};
