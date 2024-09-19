"use client";

import { ReactElement } from "react";
import { SidebarLink } from "@/app/types/sidebar-link";
import SimpleTooltip from "@/components/simple-tooltip";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    ChartBarSquareIcon,
    ClipboardIcon,
    Cog6ToothIcon,
    FireIcon,
    WrenchIcon,
} from "@heroicons/react/24/outline";
import { useOrganizationContext } from "@/app/provider/organization-provider";
import { OrganizationState } from "@/app/store/organization-store";

const links: SidebarLink[] = [
    {
        name: "Status Pages",
        icon: <ClipboardIcon />,
        href: "/status-pages",
    },
    {
        name: "Automations",
        icon: <WrenchIcon />,
        href: "/automations",
    },
    {
        name: "Incidents",
        icon: <FireIcon />,
        href: "/incidents",
    },
    {
        name: "Insights",
        icon: <ChartBarSquareIcon />,
        href: "/insights",
    },
    {
        name: "Settings",
        icon: <Cog6ToothIcon />,
        href: "/settings",
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
    return (
        <div className="mt-3.5 w-full flex flex-col gap-0.5">
            {links.map((link: SidebarLink, index: number) => {
                const active: boolean = index === 0;
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
                            href={`/dashboard/org/${selectedOrganization}${link.href}`}
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
