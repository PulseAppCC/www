"use client";

import { ReactElement } from "react";
import Branding from "@/components/branding";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import OrganizationSelector from "@/components/dashboard/sidebar/organization-selector";
import Links from "@/components/dashboard/sidebar/sidebar-links";
import { User } from "@/app/types/user/user";
import { useUserContext } from "@/app/provider/user-provider";
import { UserState } from "@/app/store/user-store";
import { hasFlag } from "@/lib/user";
import { UserFlag } from "@/app/types/user/user-flag";
import UserMenu from "@/components/dashboard/sidebar/user-menu/user-menu";

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
        <nav className="w-16 md:w-56 px-3 py-4 h-screen flex flex-col items-center bg-zinc-900 border-r transition-all transform-gpu">
            {/* Header */}
            <Link
                className="flex gap-4 items-center select-none group"
                href="/dashboard"
                draggable={false}
            >
                <Branding className="pointer-events-none" size="xs" />
                <h1 className="hidden opacity-0 md:flex md:opacity-100 text-2xl font-bold group-hover:opacity-75 transition-all transform-gpu">
                    Pulse App
                </h1>
            </Link>
            <Separator className="w-12 md:w-48 my-3.5 transition-all transform-gpu" />

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
