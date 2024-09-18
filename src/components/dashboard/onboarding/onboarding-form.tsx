"use client";

import { ReactElement, useState } from "react";
import { BriefcaseIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/api";
import { useUserContext } from "@/app/provider/user-provider";
import { UserState } from "@/app/store/user-store-props";
import { Session } from "@/app/types/user/session";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User } from "@/app/types/user/user";

/**
 * Define the various stages of onboarding.
 */
const organizationName = z.string().min(2, "You need a longer org name!!!");
const stages: OnboardingStage[] = [
    {
        name: "Onboarding",
        description:
            "Welcome to Pulse App! To get started, first create your organization!",
        schema: z.object({
            organizationName,
        }),
    },
    {
        name: "Status Page",
        description:
            "Next, create your status page and jump right into the app!",
        schema: z.object({
            organizationName,
            statusPageName: z
                .string()
                .min(2, "You need a longer status page name!!!"),
        }),
    },
];

/**
 * The form to complete the
 * onboarding process for a user.
 *
 * @return the form jsx
 */
const OnboardingForm = (): ReactElement => {
    const session: Session | undefined = useUserContext(
        (state: UserState) => state.session
    );
    const user: User | undefined = useUserContext(
        (state: UserState) => state.user
    );
    const [stage, setStage] = useState<OnboardingStage>(stages[0]);
    const [error, setError] = useState<string | undefined>(undefined);
    const router: AppRouterInstance = useRouter();

    // Build the form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(stage.schema),
    });

    /**
     * Handle submitting the form.
     */
    const onSubmit = async ({ organizationName, statusPageName }: any) => {
        // Completed onboarding
        if (stage === stages[stages.length - 1]) {
            const { data, error } = await apiRequest<void>({
                endpoint: "/user/complete-onboarding",
                method: "POST",
                session,
                body: {
                    organizationName,
                    statusPageName,
                },
            });
            setError(error?.message ?? undefined);
            if (!error) {
                toast(
                    <p>
                        Welcome to Pulse App <b>{user?.username}</b>! We hope
                        you enjoy (:
                    </p>
                );
                router.push("/dashboard");
            }
            return;
        }
        // Progress to the next stage
        setStage(stages[stages.indexOf(stage) + 1]);
    };

    return (
        <motion.div
            key={stage.name}
            className="flex flex-col gap-3"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <form
                className="flex flex-col gap-2"
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* Header */}
                <div className="flex flex-col gap-1 select-none pointer-events-none">
                    <h1 className="text-3xl font-bold">{stage.name}</h1>
                    <p className="max-w-[20rem] opacity-65">
                        {stage.description}
                    </p>
                </div>

                {/* Organization Name */}
                {stage === stages[0] && (
                    <div className="relative">
                        <BriefcaseIcon className="absolute left-2 top-[0.6rem] w-[1.15rem] h-[1.15rem]" />
                        <Input
                            className="pl-8 rounded-lg"
                            placeholder="Organization Name"
                            {...register("organizationName")}
                        />
                    </div>
                )}

                {/* Status Page Name */}
                {stage === stages[1] && (
                    <div className="relative">
                        <ClipboardIcon className="absolute left-2 top-[0.6rem] w-[1.15rem] h-[1.15rem]" />
                        <Input
                            className="pl-8 rounded-lg"
                            placeholder="Status Page Name"
                            {...register("statusPageName")}
                        />
                    </div>
                )}

                {/* Display the global error if it exists, otherwise show the first field error */}
                <p className="text-red-500">
                    {error
                        ? error
                        : Object.values(errors).find(
                              (err: any) => err?.message
                          ) &&
                          Object.values(errors)
                              .find((err: any) => err?.message)
                              ?.message?.toString()}
                </p>

                {/* Back/Next Buttons */}
                <div className="mt-1.5 flex justify-between">
                    <Button
                        className="bg-white"
                        type="button"
                        disabled={stage === stages[0]}
                        onClick={() =>
                            setStage(stages[stages.indexOf(stage) - 1])
                        }
                    >
                        Back
                    </Button>
                    <Button className="bg-white" type="submit">
                        {stage === stages[stages.length - 1]
                            ? "Finish"
                            : "Next"}
                    </Button>
                </div>
            </form>
        </motion.div>
    );
};
export default OnboardingForm;
