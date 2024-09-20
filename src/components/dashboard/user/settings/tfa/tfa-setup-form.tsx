"use client";

import { ReactElement, useState } from "react";
import { UserSetupTfaResponse } from "@/app/types/user/response/user-setup-tfa-response";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { apiRequest } from "@/lib/api";
import { Session } from "@/app/types/user/session";
import { useUserContext } from "@/app/provider/user-provider";
import { UserState } from "@/app/store/user-store";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const FormSchema = z.object({
    pin: z.string(),
});

/**
 * The form used to complete
 * the setup of TFA for a user.
 *
 * @param tfaResponse the tfa setup response
 * @param setEnabledTfa the function to invoke to indicate tfa is enabled
 * @return the form jsx
 */
const TfaSetupForm = ({
    tfaResponse,
    setEnabledTfa,
}: {
    tfaResponse: UserSetupTfaResponse;
    setEnabledTfa: (hidden: boolean) => void;
}): ReactElement => {
    const session: Session | undefined = useUserContext(
        (state: UserState) => state.session
    );

    const [value, setValue] = useState<string | undefined>();
    const [verifying, setVerifying] = useState<boolean>(false);
    const [backupCodes, setBackupCodes] = useState<string[] | undefined>();
    const [error, setError] = useState<string | undefined>(undefined);

    // Build the form
    const {
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(FormSchema),
    });

    /**
     * Handle submitting the form.
     */
    const onSubmit = async ({ pin }: any) => {
        if (pin.length !== 6) {
            return;
        }
        setVerifying(true);
        const { data, error } = await apiRequest<string[]>({
            endpoint: "/user/enable-tfa",
            method: "POST",
            session,
            body: {
                secret: tfaResponse?.secret,
                pin,
            },
        });
        setBackupCodes(data);
        if (data) {
            setEnabledTfa(true);
        }
        setError(error?.message ?? undefined);
        setVerifying(false);
    };

    return (
        <form
            className="flex flex-col gap-4 items-center"
            onSubmit={handleSubmit(onSubmit)}
        >
            {backupCodes ? (
                <div className="mt-3 grid grid-cols-2 gap-4">
                    {backupCodes.map((code, index) => (
                        <div key={index} className="p-2 border rounded-md">
                            {code}
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    {/* Notice */}
                    <p className="max-w-64 text-sm text-center opacity-75">
                        Enter the 6-digit pin provided by your authenticator app
                        below to enable two-factor authentication!
                    </p>

                    {/* Input */}
                    <InputOTP
                        maxLength={6}
                        value={value}
                        onChange={async (pin: string) => {
                            await onSubmit({ pin });
                            setValue(pin);
                        }}
                    >
                        <InputOTPGroup>
                            {[0, 1, 2].map((index: number) => (
                                <InputOTPSlot key={index} index={index} />
                            ))}
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            {[3, 4, 5].map((index: number) => (
                                <InputOTPSlot key={index} index={index} />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>

                    {/* Display the error if it exists */}
                    {error && (
                        <p className="-mt-2 pb-0.5 text-red-500">{error}</p>
                    )}

                    {/* Verify Pin */}
                    <Button
                        className="w-32 flex gap-2.5 items-center text-white"
                        type="submit"
                        disabled={verifying}
                    >
                        {verifying && (
                            <ArrowPathIcon className="w-4 h-4 animate-spin" />
                        )}
                        <span>{verifying ? "Verifying..." : "Verify Pin"}</span>
                    </Button>
                </>
            )}
        </form>
    );
};

export default TfaSetupForm;
