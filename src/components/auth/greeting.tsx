"use client";

import { ReactElement } from "react";
import Branding from "@/components/branding";

/**
 * The greetings for the auth page.
 *
 * @return the greeting jsx
 */
const Greeting = (): ReactElement => {
    const currentHour: number = new Date().getHours();
    const greeting: string =
        currentHour < 12
            ? "Morning"
            : currentHour < 18
              ? "Afternoon"
              : "Evening";
    // return (
    //     <h1 className="text-3xl font-bold select-none pointer-events-none">
    //         Good {greeting},
    //     </h1>
    // );

    return (
        <div className="flex flex-col gap-1.5 justify-center items-center select-none pointer-events-none">
            <Branding />
            <h1 className="text-3xl font-bold leading-none">
                Good {greeting},
            </h1>
            <h2 className="opacity-65">Please login to continue!</h2>
        </div>
    );
};
export default Greeting;
