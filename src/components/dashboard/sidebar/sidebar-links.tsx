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

const links: SidebarLink[] = [
    {
        name: "Home",
        icon: <HomeIcon />,
        href: "/dashboard",
    },
    {
        name: "Status Pages",
        icon: <ClipboardIcon />,
        href: "/dashboard/{org}/status-pages",
    },
    {
        name: "Automations",
        icon: <WrenchIcon />,
        href: "/dashboard/{org}/automations",
    },
    {
        name: "Incidents",
        icon: <FireIcon />,
        href: "/dashboard/{org}/incidents",
    },
    {
        name: "Insights",
        icon: <ChartBarSquareIcon />,
        href: "/dashboard/{org}/insights",
    },
    {
        name: "Audit Logs",
        icon: <PencilSquareIcon />,
        href: "/dashboard/{org}/audit",
    },
    {
        name: "Settings",
        icon: <Cog6ToothIcon />,
        href: "/dashboard/{org}/settings",
    },
];

/**
 * The links to display on
 * the dashboard sidebar.
 *
 * @return the links jsx
 */
const Links = (): ReactElement => {
    const selectedOrganization: string | undefined = useOrganizationContext(
        (state: OrganizationState) => state.selected
    );
    const path: string = usePathname();
    return (
        <div className="mt-3.5 w-full flex flex-col gap-0.5 select-none">
            {links.map((link: SidebarLink, index: number) => {
                const href: string = link.href.replace(
                    "{org}",
                    selectedOrganization as string
                );
                const active: boolean = path.startsWith(href);
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
                            href={href}
                        >
                            <div className="relative w-5 h-5">{link.icon}</div>
                            {link.name}
                        </Link>
                    </SimpleTooltip>
                );
            })}
        </div>
    );
};
export default Links;
