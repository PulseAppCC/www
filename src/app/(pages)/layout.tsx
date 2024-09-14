import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../style/globals.css";
import { ReactElement, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { NextFont } from "next/dist/compiled/@next/font";
import { ThemeProvider } from "@/components/theme-provider";

const inter: NextFont = Inter({ subsets: ["latin"] });

/**
 * The metadata for this app.
 */
export const metadata: Metadata = {
    title: "PulseApp",
    description:
        "A lightweight service monitoring solution for tracking the availability of whatever service your heart desires!",
    openGraph: {
        images: [
            {
                url: "https://pulseapp.cc/logo.png",
                width: 128,
                height: 128,
            },
        ],
    },
    twitter: {
        card: "summary",
    },
};
export const viewport: Viewport = {
    themeColor: "#DC2626",
};

/**
 * The primary layout for this app.
 */
const RootLayout = ({
    children,
}: Readonly<{
    children: ReactNode;
}>): ReactElement => (
    <html lang="en">
        <body className={cn(inter.className, "antialiased")}>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </body>
    </html>
);
export default RootLayout;
