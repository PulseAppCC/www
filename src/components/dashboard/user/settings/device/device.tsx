"use client";

import { ReactElement, useEffect, useState } from "react";
import { Device as DeviceType } from "@/app/types/user/device";
import { capitalizeWords } from "@/lib/string";
import { DateTime } from "luxon";
import {
    ArrowLeftEndOnRectangleIcon,
    ComputerDesktopIcon,
    DevicePhoneMobileIcon,
    DeviceTabletIcon,
    QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SimpleTooltip from "@/components/simple-tooltip";
import Image from "next/image";

const deviceIcons = {
    DESKTOP: <ComputerDesktopIcon />,
    TABLET: <DeviceTabletIcon />,
    PHONE: <DevicePhoneMobileIcon />,
    UNKNOWN: <QuestionMarkCircleIcon />,
};

const browserIcons = {
    FIREFOX: "firefox.svg",
    EDGE: "edge.svg",
    CHROME: "firefox.svg",
    SAFARI: "safari.svg",
    SAMSUNGBROWSER: "samsung.svg",
    UNKNOWN: <QuestionMarkCircleIcon />,
};

const Device = ({
    device,
    current,
}: {
    device: DeviceType;
    current: boolean;
}): ReactElement => {
    const [timeSinceFirstLogin, setTimeSinceFirstLogin] = useState(
        DateTime.fromISO(device.firstLogin.toString()).toRelative()
    );
    const browserIcon: ReactElement | string = browserIcons[device.browserType];

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeSinceFirstLogin(
                DateTime.fromISO(device.firstLogin.toString()).toRelative()
            );
        }, 1000);
        return () => clearInterval(interval);
    }, [device.firstLogin]);

    return (
        <div className="relative p-3 flex gap-3 items-center border bg-background/30 rounded-lg hover:opacity-90 transition-all transform-gpu select-none">
            {/* Device & Browser Icons */}
            <div className="p-2.5 relative flex justify-center items-center bg-zinc-800/75 rounded-full">
                <div className="relative w-6 h-6">
                    {deviceIcons[device.type]}
                </div>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5">
                    {typeof browserIcon === "string" ? (
                        <Image
                            src={`/media/browsers/${browserIcon}`}
                            alt={`The ${capitalizeWords(device.browserType)} browser icon`}
                            fill
                            draggable={false}
                        />
                    ) : (
                        browserIcon
                    )}
                </div>
            </div>

            {/* Name & Location */}
            <div className="flex flex-col gap-0.5 text-sm">
                <h1 className="font-semibold">
                    {capitalizeWords(device.type)} ·{" "}
                    {capitalizeWords(device.browserType)}
                </h1>
                <SimpleTooltip content={`IP Address: ${device.ip}`}>
                    <p className="opacity-75">
                        {device.location ?? "Unknown Location"} ·{" "}
                        {timeSinceFirstLogin}
                    </p>
                </SimpleTooltip>
            </div>

            {/* Corner Content */}
            <div className="absolute top-1 right-1 flex">
                {/* Current Badge */}
                {current && (
                    <Badge className="bg-zinc-900" variant="outline">
                        This Device
                    </Badge>
                )}

                {/* Controls */}
                {!current && (
                    <div className="flex gap-2">
                        <Button
                            className="p-0 w-5 h-5 text-red-500 hover:bg-transparent hover:text-red-500/75"
                            size="icon"
                            variant="ghost"
                            disabled
                        >
                            <ArrowLeftEndOnRectangleIcon />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Device;
