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

/**
 * The props for this header.
 */
type DashboardHeaderProps = {
    /**
     * The title of this header.
     */
    title: string;

    /**
     * The breadcrumb of this header.
     */
    breadcrumb: ReactElement;
};

/**
 * The header to display
 * on dashboard pages.
 *
 * @param props the header props
 * @return the header jsx
 */
const DashboardHeader = ({
    title,
    breadcrumb,
}: DashboardHeaderProps): ReactElement => {
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
                    {breadcrumb}
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};
export default DashboardHeader;
