"use client";

import { ReactElement } from "react";
import { User } from "@/app/types/user/user";
import { useUserContext } from "@/app/provider/user-provider";
import { UserState } from "@/app/store/user-store";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Organization } from "@/app/types/org/organization";
import { useOrganizationContext } from "@/app/provider/organization-provider";
import { OrganizationState } from "@/app/store/organization-store";
import { usePathname } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import UserMenuLinks from "@/components/dashboard/sidebar/user-menu/user-menu-links";
import OrganizationLogo from "@/components/org/organization-logo";
import UserAvatar from "@/components/user/user-avatar";

/**
 * The props for this header.
 */
type DashboardHeaderProps = {
    /**
     * The title of this header.
     */
    title: string;
};

/**
 * The header to display
 * on dashboard pages.
 *
 * @param props the header props
 * @return the header jsx
 */
const DashboardHeader = ({ title }: DashboardHeaderProps): ReactElement => {
    const path: string = usePathname();

    const user: User | undefined = useUserContext(
        (state: UserState) => state.user
    );
    const selectedOrganization: Organization | undefined =
        useOrganizationContext((state: OrganizationState) => state.selected);

    return (
        <div className="flex flex-col gap-1.5 select-none">
            <h1 className="text-2xl font-bold">{title}</h1>

            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard" draggable={false}>
                            Dashboard
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    {path.startsWith("/dashboard/org") ? (
                        <OrganizationBreadcrumb
                            organization={selectedOrganization as Organization}
                        />
                    ) : (
                        <UserBreadcrumb user={user as User} />
                    )}
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};

const UserBreadcrumb = ({ user }: { user: User }): ReactElement => (
    <BreadcrumbItem>
        <DropdownMenu>
            <DropdownMenuTrigger className="flex gap-1.5 items-center">
                <UserAvatar className="translate-y-0.5" user={user} size="sm" />
                <span>@{user?.username}</span>
                <ChevronDownIcon className="w-3 h-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <UserMenuLinks />
            </DropdownMenuContent>
        </DropdownMenu>
    </BreadcrumbItem>
);

const OrganizationBreadcrumb = ({
    organization,
}: {
    organization: Organization;
}): ReactElement => (
    <BreadcrumbItem className="gap-3">
        <OrganizationLogo organization={organization} size="sm" />
        <span>{organization.name}</span>
    </BreadcrumbItem>
);

export default DashboardHeader;
