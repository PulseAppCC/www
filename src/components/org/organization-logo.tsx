import * as React from "react";
import { ReactElement } from "react";
import { Organization } from "@/app/types/org/organization";
import GenericAvatar from "@/components/generic-avatar";

/**
 * The props for this component.
 */
type OrganizationLogoProps = {
    /**
     * The organization to show the logo for.
     */
    organization: Organization;
} & Omit<
    React.ComponentProps<typeof GenericAvatar>,
    "image" | "imageAlt" | "initialsText"
>;

/**
 * The logo for an organization.
 *
 * @param organization the org to show the logo for
 * @param props additional props
 * @return the logo jsx
 */
const OrganizationLogo = ({
    organization,
    ...props
}: OrganizationLogoProps): ReactElement => (
    <GenericAvatar
        image={
            organization.logo &&
            `${process.env.NEXT_PUBLIC_CDN_ENDPOINT}/organizations/${organization.logo}.webp`
        }
        imageAlt={`${organization.name}'s Logo`}
        initialsText={organization.name}
        {...props}
    />
);
export default OrganizationLogo;
