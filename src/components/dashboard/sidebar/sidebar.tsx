"use client";

import { ReactElement } from "react";
import Branding from "@/components/branding";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import OrganizationSelector from "@/components/dashboard/sidebar/organization-selector";
import Links from "@/components/dashboard/sidebar/links";
import { User } from "@/app/types/user/user";
import { useUserContext } from "@/app/provider/user-provider";
import { UserState } from "@/app/store/user-store";
import { hasFlag } from "@/lib/user";
import { UserFlag } from "@/app/types/user/user-flag";
import UserMenu from "@/components/dashboard/sidebar/user-menu";

/**
 * The sidebar to display on the dashboard.
 *
 * @return the sidebar jsx
 */
const Sidebar = (): ReactElement => {
    const user: User | undefined = useUserContext(
        (state: UserState) => state.user
    );
    return hasFlag(user as User, UserFlag.COMPLETED_ONBOARDING) ? (
        <nav className="w-56 px-3 py-4 h-screen flex flex-col items-center bg-zinc-900 border-r">
            {/* Header */}
            <Link
                className="flex gap-4 items-center select-none group"
                href="/dashboard"
            >
                <Branding size="xs" />
                <h1 className="text-2xl font-bold group-hover:opacity-75 transition-all transform-gpu">
                    Pulse App
                </h1>
            </Link>
            <Separator className="w-32 my-3.5" />

            {/* Content */}
            <OrganizationSelector />
            <Links />
            <div className="mt-auto">
                <UserMenu />
            </div>
        </nav>
    ) : (
        <div />
    );
};
export default Sidebar;
