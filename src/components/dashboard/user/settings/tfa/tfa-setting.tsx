import { ReactElement, useState } from "react";
import { User } from "@/app/types/user/user";
import { useUserContext } from "@/app/provider/user-provider";
import { UserState } from "@/app/store/user-store";
import { apiRequest } from "@/lib/api";
import { QRCodeCanvas } from "qrcode.react";
import { Session } from "@/app/types/user/session";
import { UserSetupTfaResponse } from "@/app/types/user/response/user-setup-tfa-response";
import { Input } from "@/components/ui/input";
import { hasFlag } from "@/lib/user";
import { UserFlag } from "@/app/types/user/user-flag";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TfaSetupForm from "@/components/dashboard/user/settings/tfa/tfa-setup-form";
import { toast } from "sonner";
import UserTfaPrompt from "@/components/user/user-tfa-prompt";

/**
 * The setting that allows a
 * {@link User} to enable
 * two-factor authentication.
 *
 * @return the setting jsx
 */
const TFASetting = (): ReactElement => {
    const session: Session | undefined = useUserContext(
        (state: UserState) => state.session
    );
    const user: User | undefined = useUserContext(
        (state: UserState) => state.user
    );

    const [tfaResponse, setTfaResponse] = useState<
        UserSetupTfaResponse | undefined
    >(undefined);
    const [enabledTfa, setEnabledTfa] = useState<boolean>(false);

    const onDialogStateChange = async (open: boolean) => {
        if (open) {
            await setupTfa();
        } else if (enabledTfa) {
            toast("Two-Factor Auth", {
                icon: "🎉",
                description:
                    "Successfully enabled two-factor auth on your account!",
            });
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    };

    /**
     * Start setting up two-factor auth.
     */
    const setupTfa = async () => {
        const { data, error } = await apiRequest<UserSetupTfaResponse>({
            endpoint: "/user/setup-tfa",
            method: "POST",
            session,
        });
        setTfaResponse(data);
    };

    /**
     * Disable two-factor auth.
     */
    const disableTfa = async ({
        pin,
        setError,
    }: {
        pin: string;
        setError: (error: string | undefined) => void;
    }) => {
        const { error } = await apiRequest<void>({
            endpoint: "/user/disable-tfa",
            method: "POST",
            session,
            body: { pin },
        });
        setError(error?.message);
        if (!error) {
            toast("Two-Factor Auth", {
                icon: "🔓",
                description:
                    "Two-factor auth has been disabled for your account.",
            });
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    };

    return (
        <div className="flex flex-col gap-3 xs:flex-row items-start xs:items-center">
            {/* Name & Description */}
            <div className="w-80 md:w-96 flex flex-col gap-0.5 select-none pointer-events-none transition-all transform-gpu">
                <h1 className="text-lg font-bold">Two-Factor Auth</h1>
                <p className="max-w-64 text-sm opacity-75">
                    Enhance your account security with an extra layer of
                    protection.
                </p>
            </div>

            {/* Setting */}
            {hasFlag(user as User, UserFlag.TFA_ENABLED) ? (
                <UserTfaPrompt
                    message="Please verify it's you before disabling two-factor auth."
                    submitButtonText="Disable TFA"
                    onSubmit={disableTfa}
                >
                    <Button size="sm" variant="destructive">
                        Disable
                    </Button>
                </UserTfaPrompt>
            ) : (
                <Dialog onOpenChange={onDialogStateChange}>
                    <DialogTrigger>
                        <Button
                            className="bg-background/30"
                            size="sm"
                            variant="outline"
                            disabled={enabledTfa}
                        >
                            Setup
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[38rem]">
                        <DialogHeader className="select-none pointer-events-none">
                            <DialogTitle className="text-xl font-bold">
                                {enabledTfa
                                    ? "Two-Factor Auth Enabled"
                                    : "Setup Two-Factor Auth"}
                            </DialogTitle>
                            {enabledTfa ? (
                                <DialogDescription>
                                    Your account now has two-factor
                                    authentication <b>enabled</b>! Make sure to
                                    save the backup codes below,{" "}
                                    <b>
                                        this is the last time you&apos;ll see
                                        them!
                                    </b>
                                </DialogDescription>
                            ) : (
                                <DialogDescription>
                                    Follow the steps below to setup two-factor
                                    authentication on your account. This adds an
                                    extra layer of security and will require not
                                    only your password, but also your mobile
                                    device during login.
                                </DialogDescription>
                            )}
                        </DialogHeader>

                        {/* Content */}
                        {!tfaResponse ? (
                            <div className="opacity-75 select-none pointer-events-none">
                                Loading...
                            </div>
                        ) : (
                            <div className="flex gap-7 justify-center items-center">
                                {!enabledTfa && (
                                    <QRCode tfaResponse={tfaResponse} />
                                )}
                                <TfaSetupForm
                                    tfaResponse={tfaResponse}
                                    setEnabledTfa={setEnabledTfa}
                                />
                            </div>
                        )}

                        {/* Close */}
                        {enabledTfa && (
                            <div className="mx-auto">
                                <DialogClose asChild>
                                    <Button
                                        className="w-44 bg-zinc-900"
                                        variant="outline"
                                    >
                                        I saved my codes!
                                    </Button>
                                </DialogClose>
                            </div>
                        )}

                        {/* Notice */}
                        {tfaResponse && !enabledTfa && (
                            <DialogFooter className="sm:justify-center gap-1.5 text-sm opacity-75 select-none">
                                <b>NOTE:</b>Enabling two-factor auth will log
                                you out of all other devices.
                            </DialogFooter>
                        )}
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

const QRCode = ({
    tfaResponse,
}: {
    tfaResponse: UserSetupTfaResponse;
}): ReactElement => (
    <div className="px-2 py-6 flex flex-col gap-4 items-center">
        <QRCodeCanvas size={156} value={tfaResponse.qrCodeUrl} />
        <div className="flex flex-col gap-1 items-center">
            <p className="opacity-75 select-none">
                Or manually copy this code...
            </p>
            <Input className="mx-14" value={tfaResponse.secret} readOnly />
        </div>
    </div>
);

export default TFASetting;
