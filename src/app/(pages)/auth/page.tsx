"use client";

import { ReactElement } from "react";
import Branding from "@/components/branding";
import OAuthProvider from "@/components/auth/oauth-provider";
import { Separator } from "@/components/ui/separator";
import AuthForm from "@/components/auth/auth-form";
import { motion } from "framer-motion";

const AuthPage = (): ReactElement => (
    <main className="min-h-screen flex justify-center items-center">
        <motion.div
            className="flex flex-col gap-3"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <h1 className="text-3xl font-bold select-none pointer-events-none">
                Good Evening,
            </h1>
            <OAuthProviders />
            <Separator className="-mb-1" />
            <AuthForm />
        </motion.div>
        <Branding className="absolute left-5 bottom-5 opacity-60" size="sm" />
    </main>
);

const OAuthProviders = (): ReactElement => (
    <div className="flex flex-col gap-2">
        <p className="opacity-50 select-none pointer-events-none">
            Continue with a third party...
        </p>
        <div className="flex gap-2.5">
            <OAuthProvider name="GitHub" icon="github" link="#" />
            <OAuthProvider name="Google" icon="google" link="#" />
        </div>
    </div>
);

export default AuthPage;
