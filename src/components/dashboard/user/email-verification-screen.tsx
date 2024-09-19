"use client";

import { ReactElement, useState } from "react";
import { User } from "@/app/types/user/user";
import { useUserContext } from "@/app/provider/user-provider";
import { UserState } from "@/app/store/user-store";

/**
 * The screen to verify your email.
 *
 * @return the screen jsx
 */
const EmailVerificationScreen = (): ReactElement => {
    const user: User | undefined = useUserContext(
        (state: UserState) => state.user
    );
    const [lastEmailSent, setLastEmailSent] = useState<Date>(new Date());

    return (
        <div className="min-h-screen flex justify-center items-center">
            {/* Header */}
            <div className="flex flex-col gap-1 text-center items-center select-none pointer-events-none">
                <h1 className="text-3xl font-bold">Email Verification</h1>
                <p className="max-w-[25rem]">
                    <span className="opacity-65">
                        We have sent your verification code to the email
                    </span>{" "}
                    <span>{user?.email}</span>
                </p>
            </div>
        </div>
    );
};
export default EmailVerificationScreen;
