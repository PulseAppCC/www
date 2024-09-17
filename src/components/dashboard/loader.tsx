import { ReactElement } from "react";
import Branding from "@/components/branding";

/**
 * The loader for the dashboard pages.
 *
 * @return the loader jsx
 */
const DashboardLoader = (): ReactElement => (
    <div
        className="absolute w-screen h-screen flex flex-col gap-1.5 animate-pulse justify-center items-center"
        style={{
            background:
                "linear-gradient(to top, hsla(240, 6%, 10%, 0.7), hsl(var(--background)))",
        }}
    >
        <Branding />
        <h1 className="text-2xl font-semibold opacity-75">Loading</h1>
    </div>
);
export default DashboardLoader;
