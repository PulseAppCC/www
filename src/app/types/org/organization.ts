import { StatusPage } from "@/app/types/page/status-page";

/**
 * An organization owned by a {@link User}.
 */
export type Organization = {
    /**
     * The snowflake id of this organization.
     */
    snowflake: string;

    /**
     * The name of this organization.
     */
    name: string;

    /**
     * The slug of this organization.
     */
    slug: string;

    /**
     * The hash to the logo of this organization, if any.
     */
    logo: string;

    /**
     * The snowflake of the {@link User}
     * that owns this organization.
     */
    ownerSnowflake: string;

    /**
     * The status pages owned by this organization.
     */
    statusPages: StatusPage[];
};
