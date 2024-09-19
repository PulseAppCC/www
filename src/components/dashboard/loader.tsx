import { ReactElement } from "react";
import Branding from "@/components/branding";
import { ArrowPathIcon, ChartBarSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import SimpleTooltip from "@/components/simple-tooltip";
import Image from "next/image";

/**
 * The loader for the dashboard pages.
 *
 * @return the loader jsx
 */
const DashboardLoader = (): ReactElement => {
    return (
        <div
            className="absolute w-screen h-screen flex flex-col justify-center items-center select-none"
            style={{
                background:
                    "linear-gradient(to top, hsla(240, 6%, 10%, 0.7), hsl(var(--background)))",
            }}
        >
            {/* Center Content */}
            <div className="flex flex-col gap-3 animate-pulse justify-center items-center">
                <Branding />
                <div className="flex gap-3.5 items-center">
                    <ArrowPathIcon className="w-7 h-7 animate-spin" />
                    <h1 className="text-2xl font-semibold opacity-75">
                        Loading
                    </h1>
                </div>
            </div>

            {/* Support */}
            <div className="absolute bottom-7 flex flex-col gap-1.5">
                <p className="opacity-75 pointer-events-none">
                    Still can&apos;t connect?
                </p>
                <div className="flex gap-2.5 justify-center items-center">
                    {/* Status Page */}
                    <SimpleTooltip content="View Status Page">
                        <Link href="https://status.pulseapp.cc">
                            <ChartBarSquareIcon className="w-6 h-6" />
                        </Link>
                    </SimpleTooltip>

                    {/* Discord */}
                    <SimpleTooltip content="Join the Discord server">
                        <Link href="https://discord.pulseapp.cc">
                            <Image
                                src="/media/platforms/discord.png"
                                alt="Discord Logo"
                                width={24}
                                height={24}
                            />
                        </Link>
                    </SimpleTooltip>
                </div>
            </div>
        </div>
    );
};
export default DashboardLoader;
