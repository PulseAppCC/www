"use client";

import { ReactElement } from "react";
import OAuthProvider from "@/components/auth/oauth-provider";
import { Separator } from "@/components/ui/separator";
import AuthForm from "@/components/auth/auth-form";
import { motion } from "framer-motion";
import Greeting from "@/components/auth/greeting";

/**
 * The page to authenticate with.
 *
 * @return the auth page
 */
const AuthPage = (): ReactElement => (
    <main className="min-h-screen flex justify-center items-center">
        <motion.div
            className="flex flex-col gap-3"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <Greeting />
            <OAuthProviders />
            <div className="mx-auto mb-1 flex gap-3 items-center select-none pointer-events-none">
                <Separator className="w-28" />
                <h1 className="opacity-65 leading-none">or</h1>
                <Separator className="w-28" />
            </div>
            <AuthForm />
        </motion.div>
    </main>
);

/**
 * The OAuth providers to login with.
 *
 * @return the providers jsx
 */
const OAuthProviders = (): ReactElement => (
    <div className="mt-1 flex gap-2.5 justify-center">
        <OAuthProvider name="GitHub" link="#" />
        <OAuthProvider name="Google" link="#" />
    </div>
);

export default AuthPage;
