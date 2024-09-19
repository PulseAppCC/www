"use client";

import { ReactElement } from "react";
import OnboardingForm from "@/components/dashboard/user/onboarding/onboarding-form";
import { useUserContext } from "@/app/provider/user-provider";
import { UserState } from "@/app/store/user-store";
import { User } from "@/app/types/user/user";
import { hasFlag } from "@/lib/user";
import { UserFlag } from "@/app/types/user/user-flag";
import CompletedOnboarding from "@/components/dashboard/user/onboarding/completed-onboarding";

const OnboardingPage = (): ReactElement => {
    const user: User | undefined = useUserContext(
        (state: UserState) => state.user
    );
    return (
        <main className="w-full min-h-screen flex justify-center items-center">
            {hasFlag(user as User, UserFlag.COMPLETED_ONBOARDING) ? (
                <CompletedOnboarding />
            ) : (
                <OnboardingForm />
            )}
        </main>
    );
};
export default OnboardingPage;
