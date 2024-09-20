"use client";

import { ReactElement } from "react";
import { Separator } from "@/components/ui/separator";
import AvatarSetting from "@/components/dashboard/user/profile/avatar-setting";
import UsernameSetting from "@/components/dashboard/user/profile/username-setting";
import EmailSetting from "@/components/dashboard/user/profile/email-setting";
import TierSetting from "@/components/dashboard/user/profile/tier-setting";
import UserSettingsHeader from "@/components/dashboard/user/user-settings-header";

/**
 * The user profile page.
 *
 * @return the page jsx
 */
const UserProfilePage = (): ReactElement => (
    <main className="w-[47rem] px-10 py-7 flex flex-col gap-5">
        <UserSettingsHeader title="My Profile" />

        {/* Content */}
        <div className="flex flex-col gap-5">
            <Separator className="opacity-65" />
            <AvatarSetting />
            <Separator className="opacity-65" />
            <EmailSetting />
            <Separator className="opacity-65" />
            <UsernameSetting />
            <Separator className="opacity-65" />
            <TierSetting />
        </div>
    </main>
);
export default UserProfilePage;
