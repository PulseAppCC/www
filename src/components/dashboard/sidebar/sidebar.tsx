import { ReactElement } from "react";
import Branding from "@/components/branding";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import OrganizationSelector from "@/components/dashboard/sidebar/organization-selector";
import Links from "@/components/dashboard/sidebar/links";

const Sidebar = (): ReactElement => (
    <nav className="w-56 px-3 py-4 h-screen flex flex-col items-center bg-zinc-900 border-r">
        {/* Header */}
        <Link className="flex gap-3 items-center group" href="/dashboard">
            <Branding size="xs" />
            <h1 className="text-xl font-bold group-hover:opacity-75 transition-all transform-gpu">
                Pulse App
            </h1>
        </Link>
        <Separator className="w-32 my-3.5" />

        {/* Content */}
        <OrganizationSelector />
        <Links />
        <div className="mt-auto">USER</div>
    </nav>
);

export default Sidebar;
