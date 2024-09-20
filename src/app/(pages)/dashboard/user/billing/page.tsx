"use client";

import { ReactElement } from "react";
import { Separator } from "@/components/ui/separator";
import UserSettingsHeader from "@/components/dashboard/user/user-settings-header";

/**
 * The user billing page.
 *
 * @return the page jsx
 */
const UserBillingPage = (): ReactElement => (
    <main className="w-[47rem] p-10 flex flex-col gap-5">
        <UserSettingsHeader title="Billing" />

        {/* Content */}
        <div className="flex flex-col gap-5">
            <Separator className="opacity-65" />
            Billing
        </div>
    </main>
);
export default UserBillingPage;
