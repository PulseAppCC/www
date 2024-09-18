"use client";

import { z } from "zod";
import { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AnimatedRightChevron from "@/components/animated-right-chevron";
import {
    ArrowPathIcon,
    AtSymbolIcon,
    EnvelopeIcon,
    LockClosedIcon,
} from "@heroicons/react/24/outline";
import { apiRequest } from "@/lib/api";
import { Cookies, useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { motion } from "framer-motion";
import Turnstile, { useTurnstile } from "react-turnstile";
import { TurnstileObject } from "turnstile-types";
import { UserAuthResponse } from "@/app/types/user/response/user-auth-response";
import { hasFlag } from "@/lib/user";
import { UserFlag } from "@/app/types/user/user-flag";
import { User } from "@/app/types/user/user";

/**
 * Define the form schemas for the various stages.
 */
const buildEmailInput = (allowEmpty: boolean) =>
    z
        .string()
        .email("That email address is invalid.")
        .refine(
            (val) => {
                return !allowEmpty || val.length > 0;
            },
            { message: "An email address is required." }
        );

const EmailSchema = z.object({
    email: buildEmailInput(false),
});

const RegisterSchema = z
    .object({
        email: buildEmailInput(true),
        username: z
            .string()
            .regex(/^[a-z0-9_.]*$/, "That username is invalid."),
        password: z.string(),
        passwordConfirmation: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        path: ["passwordConfirmation"],
        message: "Your passwords do not match.",
    });

const LoginSchema = z.object({
    email: buildEmailInput(true),
    password: z.string(),
});

/**
 * The animation variants for the inputs.
 */
const inputAnimationVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.15 } },
};

/**
 * The form used to authenticate.
 *
 * @return the form jsx
 */
const AuthForm = (): ReactElement => {
    const [stage, setStage] = useState<"email" | "register" | "login">("email");
    const [loading, setLoading] = useState<boolean>(false);
    const [captchaResponse, setCaptchaResponse] = useState<string | undefined>(
        undefined
    );
    const [error, setError] = useState<string | undefined>(undefined);
    const turnstile: TurnstileObject = useTurnstile();
    const cookies: Cookies = useCookies();
    const router: AppRouterInstance = useRouter();

    // Build the form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(
            stage === "email"
                ? EmailSchema
                : stage === "register"
                  ? RegisterSchema
                  : LoginSchema
        ),
    });

    /**
     * Handle submitting the form.
     */
    const onSubmit = async ({
        email,
        username,
        password,
        passwordConfirmation,
    }: any) => {
        setLoading(true);
        if (stage === "email") {
            const { data, error } = await apiRequest<{ exists: boolean }>({
                endpoint: `/user/exists?email=${email}`,
            });
            setStage(data?.exists ? "login" : "register");
        } else {
            const registering: boolean = stage === "register";
            const { data, error } = await apiRequest<UserAuthResponse>({
                endpoint: `/auth/${registering ? "register" : "login"}`,
                method: "POST",
                body: registering
                    ? {
                          email,
                          username,
                          password,
                          passwordConfirmation,
                          captchaResponse,
                      }
                    : {
                          email,
                          password,
                          captchaResponse,
                      },
            });
            setError(error?.message ?? undefined);

            // Reset the captcha if auth fails
            if (error) {
                turnstile.reset();
            } else {
                // Otherwise store the session and redirect to the dashboard
                cookies.set("session", JSON.stringify(data?.session), {
                    expires:
                        ((data?.session.expires as number) - Date.now()) /
                        86_400_000,
                    secure: true,
                    sameSite: "lax",
                });
                router.push(
                    hasFlag(data?.user as User, UserFlag.COMPLETED_ONBOARDING)
                        ? "/dashboard"
                        : "/dashboard/onboarding"
                );
                return;
            }
        }
        setLoading(false);
    };

    // Render the form
    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Address */}
            <div className="relative">
                <EnvelopeIcon className="absolute left-2 top-[0.6rem] w-[1.15rem] h-[1.15rem]" />
                <Input
                    className="pl-8 rounded-lg"
                    type="email"
                    placeholder="bob@example.com"
                    disabled={stage !== "email"}
                    {...register("email")}
                />
            </div>

            {/* Username */}
            {stage === "register" && (
                <motion.div
                    key="username"
                    className="relative"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={inputAnimationVariants}
                >
                    <AtSymbolIcon className="absolute left-2 top-[0.6rem] w-[1.15rem] h-[1.15rem]" />
                    <Input
                        className="pl-8 rounded-lg"
                        placeholder="Username"
                        {...register("username")}
                    />
                </motion.div>
            )}

            {/* Password */}
            {stage !== "email" && (
                <motion.div
                    key="password"
                    className="relative"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={inputAnimationVariants}
                >
                    <LockClosedIcon className="absolute left-2 top-[0.6rem] w-[1.15rem] h-[1.15rem]" />
                    <Input
                        className="pl-8 rounded-lg"
                        type="password"
                        placeholder="Password"
                        {...register("password")}
                    />
                </motion.div>
            )}

            {/* Password Confirmation */}
            {stage === "register" && (
                <motion.div
                    key="passwordConfirmation"
                    className="relative"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={inputAnimationVariants}
                >
                    <LockClosedIcon className="absolute left-2 top-[0.6rem] w-[1.15rem] h-[1.15rem]" />
                    <Input
                        className="pl-8 rounded-lg"
                        type="password"
                        placeholder="Confirm Password"
                        {...register("passwordConfirmation")}
                    />
                </motion.div>
            )}

            {/* Captcha */}
            <Turnstile
                sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY as string}
                responseField={false}
                onVerify={(token: string) => setCaptchaResponse(token)}
            />

            {/* Display the global error if it exists, otherwise show the first field error */}
            <p className="-mt-2 pb-0.5 text-red-500">
                {error
                    ? error
                    : Object.values(errors).find((err: any) => err?.message) &&
                      Object.values(errors)
                          .find((err: any) => err?.message)
                          ?.message?.toString()}
            </p>

            {/* Submit Form */}
            <Button
                className="h-11 flex gap-2.5 items-center text-white border border-secondary transition-all transform-gpu group"
                type="submit"
                disabled={loading}
            >
                {loading && <ArrowPathIcon className="w-4 h-4 animate-spin" />}
                <span className="-translate-y-0.5">
                    {stage === "email"
                        ? "Continue"
                        : stage === "register"
                          ? "Register"
                          : "Login"}
                </span>
                {!loading && <AnimatedRightChevron />}
            </Button>
        </form>
    );
};

export default AuthForm;
