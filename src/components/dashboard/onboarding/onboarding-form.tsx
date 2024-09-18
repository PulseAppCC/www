"use client";

import { ReactElement, useState } from "react";
import {
    BriefcaseIcon,
    ClipboardIcon,
    LinkIcon,
} from "@heroicons/react/24/outline";
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
const organizationSlug = z.string().min(2, "You need a longer org slug!!!");
const stages: OnboardingStage[] = [
    {
        name: "Create a new organization",
        description:
            "First create your organization! Organizations are used to manage your status pages.",
        schema: z.object({
            organizationName,
            organizationSlug,
        }),
    },
    {
        name: "Create a new status page",
        description:
            "Thanks! Next, create your status page and jump right into the app!",
        schema: z.object({
            organizationName,
            organizationSlug,
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
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(stage.schema),
    });
    const organizationName: string | undefined = watch(
        "organizationName",
        undefined
    );
    const defaultOrgSlug: string = `${user?.username}'s Cool Org`;
    const organizationSlugPreview = buildOrgSlugPreview(
        organizationName || defaultOrgSlug
    );

    /**
     * Handle submitting the form.
     */
    const onSubmit = async ({
        organizationName,
        organizationSlug,
        statusPageName,
    }: any) => {
        // Completed onboarding
        if (stage === stages[stages.length - 1]) {
            const { data, error } = await apiRequest<void>({
                endpoint: "/user/complete-onboarding",
                method: "POST",
                session,
                body: {
                    organizationName,
                    organizationSlug,
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
            className="w-96 flex flex-col gap-2.5"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            {/* Header */}
            <div className="flex flex-col gap-1 text-center items-center select-none pointer-events-none">
                <h1 className="text-3xl font-bold">{stage.name}</h1>
                <p className="max-w-[25rem] opacity-65">{stage.description}</p>
            </div>

            <form
                className="flex flex-col gap-0.5"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="my-3 p-6 pb-3.5 flex flex-col gap-3.5 justify-center bg-zinc-900 rounded-lg">
                    {/* Organization Name */}
                    {stage === stages[0] && (
                        <div className="flex flex-col gap-1.5">
                            <p className="text-sm font-medium">
                                Organization Name
                            </p>
                            <div className="relative">
                                <BriefcaseIcon className="absolute left-2 top-[0.6rem] w-[1.15rem] h-[1.15rem]" />
                                <Input
                                    className="pl-8 rounded-lg"
                                    defaultValue={defaultOrgSlug}
                                    {...register("organizationName")}
                                />
                            </div>
                        </div>
                    )}

                    {/* Organization Slug */}
                    {stage === stages[0] && (
                        <div className="flex flex-col gap-1.5">
                            <p className="text-sm font-medium">
                                Organization Slug
                            </p>
                            <div className="relative">
                                <div className="absolute left-2 top-[0.5rem] flex gap-1 items-center">
                                    <LinkIcon className="w-[1.15rem] h-[1.15rem]" />
                                    <p className="text-sm opacity-60">
                                        pulseapp.cc/
                                    </p>
                                </div>
                                <Input
                                    className="pl-[7.25rem] rounded-lg"
                                    placeholder={organizationSlugPreview}
                                    defaultValue={organizationSlugPreview}
                                    {...register("organizationSlug")}
                                />
                            </div>
                        </div>
                    )}

                    {/* Status Page Name */}
                    {stage === stages[1] && (
                        <div className="flex flex-col gap-1.5">
                            <p className="text-sm font-medium">
                                Status Page Name
                            </p>
                            <div className="relative">
                                <ClipboardIcon className="absolute left-2 top-[0.6rem] w-[1.15rem] h-[1.15rem]" />
                                <Input
                                    className="pl-8 rounded-lg"
                                    defaultValue={`${user?.username}'s Status Page`}
                                    {...register("statusPageName")}
                                />
                            </div>
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
                </div>

                {/* Back/Next Buttons */}
                <div className="flex justify-between">
                    <Button
                        className="text-white"
                        type="button"
                        color={stage === stages[0] ? "secondary" : "primary"}
                        disabled={stage === stages[0]}
                        onClick={() =>
                            setStage(stages[stages.indexOf(stage) - 1])
                        }
                    >
                        Back
                    </Button>
                    <Button className="text-white" type="submit">
                        {stage === stages[stages.length - 1]
                            ? "Finish"
                            : "Next"}
                    </Button>
                </div>
            </form>
        </motion.div>
    );
};

const buildOrgSlugPreview = (organizationName: string): string =>
    organizationName
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/[^a-z0-9-]/g, ""); // Remove special characters (keeping hyphens)

export default OnboardingForm;
