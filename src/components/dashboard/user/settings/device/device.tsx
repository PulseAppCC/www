"use client";

import { ReactElement, useEffect, useState } from "react";
import { Device as DeviceType } from "@/app/types/user/device";
import { capitalizeWords } from "@/lib/string";
import { DateTime } from "luxon";
import {
    ArrowLeftEndOnRectangleIcon,
    ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const deviceIcons = {
    DESKTOP: <ComputerDesktopIcon />,
    TABLET: <ComputerDesktopIcon />,
    PHONE: <ComputerDesktopIcon />,
    UNKNOWN: <ComputerDesktopIcon />,
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

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeSinceFirstLogin(
                DateTime.fromISO(device.firstLogin.toString()).toRelative()
            );
        }, 60000);
        return () => clearInterval(interval);
    }, [device.firstLogin]);

    return (
        <div className="relative p-3 flex gap-3 items-center border bg-background/30 rounded-lg hover:opacity-90 transition-all transform-gpu select-none">
            {/* Device & Browser Icons */}
            <div className="p-2.5 relative flex justify-center items-center bg-zinc-800/75 rounded-full">
                <div className="relative w-6 h-6">
                    {deviceIcons[device.type]}
                </div>
            </div>

            {/* Name & Location */}
            <div className="flex flex-col gap-0.5 text-sm">
                <h1 className="font-semibold">
                    {capitalizeWords(device.type)} ·{" "}
                    {capitalizeWords(device.browserType)}
                </h1>
                <p className="opacity-75">
                    {device.location ?? "Unknown Location"} ·{" "}
                    {timeSinceFirstLogin}
                </p>
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
