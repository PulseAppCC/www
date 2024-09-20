"use client";

import { ReactElement, useCallback, useEffect, useState } from "react";
import { User } from "@/app/types/user/user";
import { useUserContext } from "@/app/provider/user-provider";
import { UserState } from "@/app/store/user-store";
import { Session } from "@/app/types/user/session";
import { Device as DeviceType } from "@/app/types/user/device";
import { apiRequest } from "@/lib/api";
import Device from "@/components/dashboard/user/settings/device/device";
import { DateTime } from "luxon";

/**
 * The setting that allows a
 * {@link User} to view the
 * devices that they are using.
 *
 * @return the setting jsx
 */
const DevicesSetting = (): ReactElement => {
    const session: Session | undefined = useUserContext(
        (state: UserState) => state.session
    );

    const [devices, setDevices] = useState<DeviceType[] | undefined>();

    /**
     * Fetch the user's devices.
     */
    const fetchDevices = useCallback(async () => {
        const { data } = await apiRequest<DeviceType[]>({
            endpoint: "/user/devices",
            session,
        });
        setDevices(data);
    }, [session]);

    useEffect(() => {
        fetchDevices();
    }, [fetchDevices]);

    return (
        <div className="px-5 flex flex-col gap-3.5 justify-center">
            {/* Name & Description */}
            <div className="w-96 flex flex-col gap-0.5 select-none pointer-events-none">
                <h1 className="text-lg font-bold">Devices</h1>
                <p className="w-[25rem] text-sm opacity-75">
                    Here is a list of devices logged into your Pulse App
                    account.
                </p>
            </div>

            {/* Setting */}
            <div className="w-[27.7rem] flex flex-col gap-2">
                {devices
                    ?.sort(
                        (a: DeviceType, b: DeviceType) =>
                            DateTime.fromISO(
                                b.firstLogin.toString()
                            ).toMillis() -
                            DateTime.fromISO(a.firstLogin.toString()).toMillis()
                    )
                    .map((device: DeviceType, index: number) => (
                        <Device
                            key={index}
                            device={device}
                            current={
                                session?.snowflake === device.sessionSnowflake
                            }
                        />
                    ))}
            </div>
        </div>
    );
};

export default DevicesSetting;
