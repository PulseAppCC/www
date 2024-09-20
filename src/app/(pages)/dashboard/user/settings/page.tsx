"use client";

import { ReactElement } from "react";
import { Separator } from "@/components/ui/separator";
import TFASetting from "@/components/dashboard/user/settings/tfa/tfa-setting";
import UserSettingsHeader from "@/components/dashboard/user/user-settings-header";

/**
 * The user settings page.
 *
 * @return the page jsx
 */
const UserSettingsPage = (): ReactElement => (
    <main className="w-[47rem] p-10 flex flex-col gap-5">
        <UserSettingsHeader title="Settings" />

        {/* Content */}
        <div className="flex flex-col gap-5">
            <Separator className="opacity-65" />
            <TFASetting />
        </div>
    </main>
);
export default UserSettingsPage;
