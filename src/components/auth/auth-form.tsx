"use client";

import { z } from "zod";
import { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AnimatedRightChevron from "@/components/animated-right-chevron";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { apiRequest } from "@/lib/api";
import { Session } from "@/app/types/session";
import { Cookies, useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { motion } from "framer-motion";

/**
 * Define the form schemas for the various stages.
 */
const EmailSchema = z.object({
    email: z.string().email("Must be a valid email address"),
});

const RegisterSchema = z.object({
    email: z.string().email("Must be a valid email address"),
    username: z.string(),
    password: z.string(),
    passwordConfirmation: z.string(),
    captchaResponse: z.string(),
});

const LoginSchema = z.object({
    email: z.union([
        z.string().email("Must be a valid email address"),
        z.string({ message: "Must be a valid username" }),
    ]),
    password: z.string(),
    // captchaResponse: z.string(),
});

const inputVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.15 } },
};

const AuthForm = (): ReactElement => {
    const [stage, setStage] = useState<"email" | "register" | "login">("email");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
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
        captchaResponse,
    }: any) => {
        setLoading(true);
        if (stage === "email") {
            const { data, error } = await apiRequest<{ exists: boolean }>(
                `/user/exists?email=${email}`
            );
            setStage(data?.exists ? "login" : "register");
        } else if (stage === "login") {
            const { data, error } = await apiRequest<Session>(
                `/auth/login`,
                "POST",
                {
                    email,
                    password,
                    captchaResponse,
                }
            );
            if (error) {
                setError(error.message);
            } else {
                cookies.set("session", JSON.stringify(data), {
                    expires:
                        ((data?.expires as number) - Date.now()) / 86_400_000,
                    secure: true,
                    sameSite: "lax",
                });
                router.push("/dashboard");
                return;
            }
        }
        setLoading(false);
    };

    // Render the form
    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
            <p className="opacity-50 select-none pointer-events-none">
                Or use your email address...
            </p>

            {/* Email Address */}
            <Input
                className="rounded-lg"
                type="email"
                placeholder="bob@example.com"
                {...register("email")}
            />

            {/* Username */}
            {stage === "register" && (
                <Input
                    className="rounded-lg"
                    placeholder="@username"
                    {...register("username")}
                />
            )}

            {/* Password */}
            {stage !== "email" && (
                <motion.div
                    key="password"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={inputVariants}
                >
                    <Input
                        className="rounded-lg"
                        type="password"
                        placeholder="Password"
                        {...register("password")}
                    />
                </motion.div>
            )}

            {/* Password Confirmation */}
            {stage === "register" && (
                <Input
                    className="rounded-lg"
                    type="password"
                    placeholder="Confirm Password"
                    {...register("passwordConfirmation")}
                />
            )}

            {/*{stage !== "email" && (*/}
            {/*    <Turnstile*/}
            {/*        responseFieldName="captchaResponse"*/}
            {/*        sitekey="0x4AAAAAAAj8DEQFLe1isCek"*/}
            {/*        {...register("captchaResponse")}*/}
            {/*    />*/}
            {/*)}*/}

            {/* Submit Form */}
            <Button
                className="h-11 mt-2 flex gap-2 items-center bg-zinc-800/75 text-white hover:bg-zinc-800/75 hover:opacity-75 transition-all transform-gpu group"
                type="submit"
                disabled={loading}
            >
                {loading && <ArrowPathIcon className="w-4 h-4 animate-spin" />}
                {stage === "email"
                    ? "Continue"
                    : stage === "register"
                      ? "Register"
                      : "Login"}
                {!loading && <AnimatedRightChevron />}
            </Button>
        </form>
    );
};
export default AuthForm;
