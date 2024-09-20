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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import UserMenuLinks from "@/components/dashboard/sidebar/user-menu/user-menu-links";

/**
 * The header to display
 * on user settings pages.
 *
 * @param title the title of this header
 * @return the header jsx
 */
const UserSettingsHeader = ({ title }: { title: string }): ReactElement => {
    const user: User | undefined = useUserContext(
        (state: UserState) => state.user
    );
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
                    <BreadcrumbItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex gap-1.5 items-center">
                                @{user?.username}
                                <ChevronDownIcon className="w-3 h-3" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                <UserMenuLinks />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};
export default UserSettingsHeader;
