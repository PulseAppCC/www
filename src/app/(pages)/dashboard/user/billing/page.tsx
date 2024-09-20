"use client";

import { ReactElement } from "react";
import { Separator } from "@/components/ui/separator";
import DashboardHeader from "@/components/dashboard/dashboard-header";

/**
 * The user billing page.
 *
 * @return the page jsx
 */
const UserBillingPage = (): ReactElement => (
    <main className="w-[47rem] flex flex-col gap-5">
        <DashboardHeader title="Billing" />

        {/* Content */}
        <div className="flex flex-col gap-5">
            <Separator className="opacity-65" />
            <p className="opacity-75 select-none pointer-events-none">
                Billing is not yet available, this will be available to cloud
                environments in the future.
            </p>
        </div>
    </main>
);
export default UserBillingPage;
