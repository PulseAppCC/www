import { ReactElement } from "react";
import { StatusPage as StatusPageType } from "@/app/types/page/status-page";
import { Button } from "@/components/ui/button";
import SimpleTooltip from "@/components/simple-tooltip";
import {
    ComputerDesktopIcon,
    GlobeAltIcon,
    MoonIcon,
    SunIcon,
} from "@heroicons/react/24/outline";
import { capitalizeWords } from "@/lib/string";
import Link from "next/link";

const themeBadges = {
    AUTO: <ComputerDesktopIcon />,
    DARK: <MoonIcon />,
    LIGHT: <SunIcon />,
};

/**
 * The status page for an organization.
 *
 * @param statusPage
 * @constructor
 */
const StatusPage = ({
    statusPage,
}: {
    statusPage: StatusPageType;
}): ReactElement => (
    <div className="p-3.5 w-72 flex flex-col gap-4 bg-background/30 border rounded-lg hover:opacity-90 transition-all transform-gpu">
        {/* Name & Slug */}
        <div className="flex flex-col gap-1 select-none">
            <h1 className="font-bold">{statusPage.name}</h1>
            <p className="text-xs opacity-75">/{statusPage.slug}</p>
        </div>

        {/* Details & Edit */}
        <div className="flex justify-between items-center">
            <Badges statusPage={statusPage} />

            {/* Edit */}
            <SimpleTooltip content="Edit this status page">
                <Link href={`/dashboard/org/status-pages/${statusPage.slug}`}>
                    <Button variant="outline" size="sm">
                        Edit
                    </Button>
                </Link>
            </SimpleTooltip>
        </div>
    </div>
);

const Badges = ({
    statusPage,
}: {
    statusPage: StatusPageType;
}): ReactElement => {
    const theme = statusPage.theme;
    return (
        <div className="flex gap-1.5 items-center">
            {/* Theme Badge */}
            <SimpleTooltip
                content={`${theme === "AUTO" ? "Automatically detected" : capitalizeWords(theme)} theme`}
            >
                <div className="w-[1.15rem] h-[1.15rem] opacity-75">
                    {themeBadges[theme]}
                </div>
            </SimpleTooltip>

            {/* Visible in search engines */}
            {statusPage.visibleInSearchEngines && (
                <SimpleTooltip content="Visible in search engines">
                    <div className="w-[1.15rem] h-[1.15rem] opacity-75">
                        <GlobeAltIcon />
                    </div>
                </SimpleTooltip>
            )}
        </div>
    );
};

export default StatusPage;
