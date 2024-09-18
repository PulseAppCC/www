import { ReactNode } from "react";
import { Metadata } from "next";

/**
 * The metadata for this layout.
 */
export const metadata: Metadata = {
    title: "Auth",
};

/**
 * The layout for the auth page.
 *
 * @param children the children to render
 * @returns the layout jsx
 */
const AuthLayout = ({
    children,
}: Readonly<{
    children: ReactNode;
}>): ReactNode => children;
export default AuthLayout;
