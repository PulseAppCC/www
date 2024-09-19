import * as React from "react";
import { ReactElement } from "react";
import { cva } from "class-variance-authority";
import Image from "next/image";
import InitialsAvatar from "react-initials-avatar";
import { cn } from "@/lib/utils";
import { Organization } from "@/app/types/org/organization";

/**
 * The variants of the logo.
 */
const logoVariants = cva("relative rounded-full", {
    variants: {
        size: {
            sm: "w-5 h-5",
            default: "w-10 h-10",
        },
    },
    defaultVariants: {
        size: "default",
    },
});

/**
 * The props for this component.
 */
type OrganizationLogoProps = {
    /**
     * The organization to show the logo for.
     */
    organization: Organization;

    /**
     * The size of the logo.
     */
    size?: "sm" | "default";

    /**
     * The optional class name to apply to the logo.
     */
    className?: string;
};

/**
 * A logo for an organization.
 *
 * @param organization the organization
 * @param size the size
 * @param className additional class names
 * @return the organization jsx
 */
const OrganizationLogo = ({
    organization,
    size,
    className,
}: OrganizationLogoProps): ReactElement => (
    <div className={cn(logoVariants({ size, className }))}>
        {organization.logo ? (
            <Image
                className="rounded-full"
                src={`${process.env.NEXT_PUBLIC_CDN_ENDPOINT}/organizations/${organization.logo}.webp`}
                alt={`${organization.name}'s Logo`}
                fill
            />
        ) : (
            <InitialsAvatar name={organization.name} />
        )}
    </div>
);
export default OrganizationLogo;
