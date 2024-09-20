"use client";

import { ReactElement, ReactNode, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

/**
 * The props for the TFA prompt.
 */
type UserTfaPromptProps = {
    /**
     * The message to display under the title.
     */
    message: string;

    /**
     * The text to display for the submit button.
     */
    submitButtonText: string;

    /**
     * Invoked when the form is submitted.
     *
     * @param pin the pin to submit
     * @param setError the error setter
     * @param closePrompt the prompt closer
     */
    onSubmit: ({
        pin,
        setError,
        closePrompt,
    }: {
        pin: string;
        setError: (error: string | undefined) => void;
        closePrompt: () => void;
    }) => Promise<any>;

    /**
     * The elements to trigger the prompt.
     */
    children: ReactNode;
};

const FormSchema = z.object({
    pin: z.string(),
});

/**
 * A universal prompt for a user's TFA pin.
 *
 * @param message the message to display
 * @param submitButtonText the submit text
 * @param onSubmit the function to invoke when the form is submitted
 * @param children the elements to trigger the prompt.
 * @return the prompt jsx
 */
const UserTfaPrompt = ({
    message,
    submitButtonText,
    onSubmit,
    children,
}: UserTfaPromptProps): ReactElement => {
    const [pin, setPin] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();

    // Build the form
    const {
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(FormSchema),
    });

    /**
     * Handle submitting the form.
     *
     * @param pin the submitted pin
     */
    const handleFormSubmit = async ({ pin }: any) => {
        if (pin.length === 6) {
            setLoading(true);
            await onSubmit({
                pin,
                setError: (error: string | undefined) => {
                    setError(error);
                    if (error) {
                        setLoading(false);
                    }
                },
                closePrompt: () =>
                    document.getElementById("closeDialog")?.click(),
            });
        }
    };

    /**
     * Cleanup the prompt when closed.
     */
    const cleanup = () => {
        setPin("");
        setLoading(false);
        setError(undefined);
    };

    // Render the prompt
    return (
        <Dialog
            onOpenChange={(open: boolean) => {
                if (!open) {
                    cleanup();
                }
            }}
        >
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                {/* Header */}
                <DialogHeader>
                    <DialogTitle>Two-Factor Border</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>

                {/* Content */}
                <form
                    className="flex flex-col gap-4 items-center"
                    onSubmit={async (event) => {
                        event.preventDefault();
                        await handleFormSubmit({ pin });
                    }}
                >
                    {/* Input */}
                    <InputOTP
                        maxLength={6}
                        value={pin}
                        onChange={async (pin: string) => {
                            await handleFormSubmit({ pin });
                            setPin(pin);
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
                        disabled={loading}
                    >
                        {loading && (
                            <ArrowPathIcon className="w-4 h-4 animate-spin" />
                        )}
                        {submitButtonText}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};
export default UserTfaPrompt;
