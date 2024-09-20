"use client";

import { ReactElement, ReactNode } from "react";
import { useOrganizationContext } from "@/app/provider/organization-provider";
import { Organization } from "@/app/types/org/organization";
import { OrganizationState } from "@/app/store/organization-store";
import NoOrganizationSelected from "@/components/dashboard/no-organization-selected";

/**
 * The layout for the organization pages.
 *
 * @param children the children to render
 * @returns the layout jsx
 */
const OrganizationLayout = ({
    children,
}: Readonly<{
    children: ReactNode;
}>): ReactElement => {
    const selectedOrganization: Organization | undefined =
        useOrganizationContext((state: OrganizationState) => state.selected);
    return (
        <div className="h-full">
            {selectedOrganization ? children : <NoOrganizationSelected />}
        </div>
    );
};
export default OrganizationLayout;
