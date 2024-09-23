"use client";

import { ReactElement } from "react";
import { Organization } from "@/app/types/org/organization";
import { useOrganizationContext } from "@/app/provider/organization-provider";
import { OrganizationState } from "@/app/store/organization-store";
import { StatusPage as StatusPageType } from "@/app/types/page/status-page";
import StatusPage from "@/components/dashboard/org/status-page/status-page";
import CreateStatusPageDialog from "@/components/dashboard/org/status-page/create-status-page-dialog";

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
        <div className="flex flex-col gap-3">
            {/* Create */}
            <div>
                <CreateStatusPageDialog />
            </div>

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
