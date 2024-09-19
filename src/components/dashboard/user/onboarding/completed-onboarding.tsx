import { ReactElement } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/**
 * The user has already completed onboarding!
 *
 * @return the completed onboarding jsx
 */
const CompletedOnboarding = (): ReactElement => (
    <div className="flex flex-col gap-1 items-center">
        <h1 className="text-3xl font-bold">Hi There!</h1>
        <p className="max-w-[20rem] text-center opacity-75">
            It seems like you already completed the onboarding process.
        </p>

        {/* Back to App */}
        <Link className="mt-2.5" href="/dashboard">
            <Button>Back to App</Button>
        </Link>
    </div>
);
export default CompletedOnboarding;
