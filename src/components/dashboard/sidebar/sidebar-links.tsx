"use client";

import { ReactElement } from "react";
import { SidebarLink } from "@/app/types/dashboard/sidebar-link";
import SimpleTooltip from "@/components/simple-tooltip";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    ChartBarSquareIcon,
    ClipboardIcon,
    Cog6ToothIcon,
    FireIcon,
    HomeIcon,
    PencilSquareIcon,
    WrenchIcon,
} from "@heroicons/react/24/outline";
import { useOrganizationContext } from "@/app/provider/organization-provider";
import { OrganizationState } from "@/app/store/organization-store";
import { usePathname } from "next/navigation";
import { Organization } from "@/app/types/org/organization";

const links: SidebarLink[] = [
    {
        name: "Home",
        icon: <HomeIcon />,
        href: "/dashboard",
    },
    {
        name: "Status Pages",
        icon: <ClipboardIcon />,
        href: "/dashboard/status-pages",
    },
    {
        name: "Automations",
        icon: <WrenchIcon />,
        href: "/dashboard/automations",
    },
    {
        name: "Incidents",
        icon: <FireIcon />,
        href: "/dashboard/incidents",
    },
    {
        name: "Insights",
        icon: <ChartBarSquareIcon />,
        href: "/dashboard/insights",
    },
    {
        name: "Audit Logs",
        icon: <PencilSquareIcon />,
        href: "/dashboard/audit",
    },
    {
        name: "Settings",
        icon: <Cog6ToothIcon />,
        href: "/dashboard/settings",
    },
];

/**
 * The links to display on
 * the dashboard sidebar.
 *
 * @return the links jsx
 */
const Links = (): ReactElement => {
    const selectedOrganization: Organization | undefined =
        useOrganizationContext((state: OrganizationState) => state.selected);
    const path: string = usePathname();
    return (
        <div className="mt-3.5 w-full flex flex-col gap-0.5 select-none">
            {links
                .filter(
                    (link: SidebarLink, index: number) =>
                        index === 0 || (index > 0 && selectedOrganization)
                )
                .map((link: SidebarLink, index: number) => {
                    const active: boolean =
                        index === 0
                            ? path === link.href
                            : path.startsWith(link.href);
                    return (
                        <SimpleTooltip
                            key={index}
                            content={`Visit ${link.name}`}
                            side="right"
                        >
                            <Link
                                className={cn(
                                    "px-3 py-2 flex gap-2 items-center text-sm rounded-lg hover:bg-zinc-800 transition-all transform-gpu",
                                    active && "font-medium bg-zinc-800"
                                )}
                                href={link.href}
                            >
                                <div className="relative w-5 h-5">
                                    {link.icon}
                                </div>
                                {link.name}
                            </Link>
                        </SimpleTooltip>
                    );
                })}
        </div>
    );
};
export default Links;
