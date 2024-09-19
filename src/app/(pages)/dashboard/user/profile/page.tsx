"use client";

import { ReactElement } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { User } from "@/app/types/user/user";
import { useUserContext } from "@/app/provider/user-provider";
import { UserState } from "@/app/store/user-store";
import { Separator } from "@/components/ui/separator";
import AvatarSetting from "@/components/dashboard/user/avatar-setting";
import UsernameSetting from "@/components/dashboard/user/username-setting";
import EmailSetting from "@/components/dashboard/user/email-setting";
import TierSetting from "@/components/dashboard/user/tier-setting";

/**
 * The user profile page.
 *
 * @return the page jsx
 */
const UserProfilePage = (): ReactElement => (
    <main className="w-[47rem] p-10 flex flex-col gap-5">
        <Header />

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

const Header = (): ReactElement => {
    const user: User | undefined = useUserContext(
        (state: UserState) => state.user
    );
    return (
        <div className="flex flex-col gap-1.5 select-none">
            <h1 className="text-2xl font-bold">My Profile</h1>

            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">
                            Dashboard
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>{user?.username}</BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>My Profile</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};

export default UserProfilePage;
