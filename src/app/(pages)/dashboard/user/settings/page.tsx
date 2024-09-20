"use client";

import { ReactElement } from "react";
import { Separator } from "@/components/ui/separator";
import TFASetting from "@/components/dashboard/user/settings/tfa/tfa-setting";
import UserSettingsHeader from "@/components/dashboard/user/user-settings-header";
import DevicesSetting from "@/components/dashboard/user/settings/device/devices-setting";

/**
 * The user settings page.
 *
 * @return the page jsx
 */
const UserSettingsPage = (): ReactElement => (
    <main className="w-[47rem] px-10 py-7 flex flex-col gap-5">
        <UserSettingsHeader title="Settings" />

        {/* Content */}
        <div className="flex flex-col gap-5">
            <Separator className="opacity-65" />
            <TFASetting />
            <Separator className="opacity-65" />
            <DevicesSetting />
        </div>
    </main>
);
export default UserSettingsPage;
