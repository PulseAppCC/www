import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";
import Branding from "@/components/branding";

/**
 * The greeting for the landing page.
 *
 * @return the greeting jsx
 */
const Greeting = (): ReactElement => (
    <div className="h-screen flex flex-col gap-4 justify-center text-center items-center">
        <div className="flex flex-col gap-2 items-center select-none pointer-events-none">
            {/* Logo */}
            <Branding className="animate-pulse" size="lg" />

            {/* Greeting */}
            <h1 className="text-3xl text-primary font-bold">Pulse App</h1>
            <p className="max-w-[30rem] text-center opacity-75">
                A lightweight service monitoring solution for tracking the
                availability of whatever service your heart desires!
            </p>
            <p className="mt-3 text-center opacity-90">Coming Soon...</p>
        </div>

        {/* GitHub */}
        <Link href="https://github.com/PulseAppCC" target="_blank">
            <Button
                className="hover:bg-transparent hover:opacity-75 transition-all transform-gpu"
                size="icon"
                variant="ghost"
            >
                <Image
                    src="/media/platforms/github.svg"
                    alt="GitHub Logo"
                    width={32}
                    height={32}
                />
            </Button>
        </Link>
    </div>
);
export default Greeting;
