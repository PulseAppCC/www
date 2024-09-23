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
                <div className="w-full mx-4 sm:mx-7 my-3 sm:my-5 transition-all transform-gpu">
                    {children}
                </div>
            </div>
        </OrganizationProvider>
    </UserProvider>
);
export default DashboardLayout;
