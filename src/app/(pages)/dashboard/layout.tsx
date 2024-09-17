import { ReactElement, ReactNode } from "react";
import UserProvider from "@/app/provider/user-provider";

/**
 * The layout for the dashboard pages.
 *
 * @param children the children to render
 * @returns the layout jsx
 */
const DashboardLayout = ({
    children,
}: Readonly<{
    children: ReactNode;
}>): ReactElement => <UserProvider>{children}</UserProvider>;
export default DashboardLayout;
