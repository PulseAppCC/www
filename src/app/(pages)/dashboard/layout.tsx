import { ReactElement, ReactNode } from "react";
import UserProvider from "@/app/provider/user-provider";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import OrganizationProvider from "@/app/provider/organization-provider";

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
}>): ReactElement => (
    <UserProvider>
        <OrganizationProvider>
            <div className="min-h-screen flex">
                <Sidebar />
                <div className="w-full mx-7 my-6">{children}</div>
            </div>
        </OrganizationProvider>
    </UserProvider>
);
export default DashboardLayout;
