"use client";

import { ReactElement } from "react";
import { Button } from "@/components/ui/button";
import SimpleTooltip from "@/components/simple-tooltip";
import { Organization } from "@/app/types/org/organization";
import { useOrganizationContext } from "@/app/provider/organization-provider";
import { OrganizationState } from "@/app/store/organization-store";
import { StatusPage as StatusPageType } from "@/app/types/page/status-page";
import StatusPage from "@/components/dashboard/org/status-page/status-page";

/**
 * A list of status pages for the
 * currently selected {@link Organization}.
 *
 * @constructor
 */
const StatusPageList = (): ReactElement => {
    const organization: Organization | undefined = useOrganizationContext(
        (state: OrganizationState) => state.selected
    );
    return (
        <div className="flex flex-col gap-5">
            {/* Create */}
            <SimpleTooltip content="Create a new status page">
                <Button className="w-24" variant="outline" size="sm" disabled>
                    Create
                </Button>
            </SimpleTooltip>

            {/* Status Pages */}
            {organization?.statusPages.map(
                (statusPage: StatusPageType, index: number) => (
                    <StatusPage key={index} statusPage={statusPage} />
                )
            )}
        </div>
    );
};
export default StatusPageList;
