"use client";

import { ReactElement } from "react";
import { useUserContext } from "@/app/provider/user-provider";
import { UserState } from "@/app/store/user-store";
import { User } from "@/app/types/user/user";
import UserAvatar from "@/components/user/user-avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    ArrowLeftEndOnRectangleIcon,
    Cog6ToothIcon,
    CreditCardIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { Cookies, useCookies } from "next-client-cookies";
import { Session } from "@/app/types/user/session";
import { apiRequest } from "@/lib/api";

/**
 * The menu to manage the user.
 *
 * @return the menu jsx
 */
const UserMenu = (): ReactElement => {
    const session: Session | undefined = useUserContext(
        (state: UserState) => state.session
    );
    const user: User | undefined = useUserContext(
        (state: UserState) => state.user
    );
    const cookies: Cookies = useCookies();
    const router: AppRouterInstance = useRouter();

    /**
     * Logout the user.
     */
    const logout = async () => {
        await apiRequest<void>({
            endpoint: "/user/logout",
            method: "POST",
            session,
        });
        cookies.remove("session");
        router.push("/");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="px-5 py-2 flex gap-2.5 items-center font-medium bg-background/30 border hover:opacity-75 rounded-lg transition-all transform-gpu">
                    <UserAvatar user={user as User} size="sm" />@
                    {user?.username}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44">
                {/* Content */}
                <MyAccount />

                {/* Logout */}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="gap-2.5 text-red-500 cursor-pointer"
                    onClick={logout}
                    draggable={false}
                >
                    <ArrowLeftEndOnRectangleIcon className="w-5 h-5" />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

/**
 * The my account section.
 *
 * @return the section jsx
 */
const MyAccount = (): ReactElement => (
    <DropdownMenuGroup>
        <DropdownMenuLabel className="select-none pointer-events-none">
            My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/dashboard/user/profile" draggable={false}>
            <DropdownMenuItem className="gap-2.5 cursor-pointer">
                <UserIcon className="w-5 h-5" />
                <span>Profile</span>
            </DropdownMenuItem>
        </Link>
        <Link href="/dashboard/user/billing" draggable={false}>
            <DropdownMenuItem className="gap-2.5 cursor-pointer">
                <CreditCardIcon className="w-5 h-5" />
                <span>Billing</span>
            </DropdownMenuItem>
        </Link>
        <Link href="/dashboard/user/settings" draggable={false}>
            <DropdownMenuItem className="gap-2.5 cursor-pointer">
                <Cog6ToothIcon className="w-5 h-5" />
                <span>Settings</span>
            </DropdownMenuItem>
        </Link>
    </DropdownMenuGroup>
);

export default UserMenu;
