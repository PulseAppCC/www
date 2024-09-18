"use client";

import { ReactElement } from "react";
import { UserState } from "@/app/store/user-store-props";
import { User } from "@/app/types/user/user";
import { useUserContext } from "@/app/provider/user-provider";

const DashboardPage = (): ReactElement => {
    const user: User | undefined = useUserContext(
        (state: UserState) => state.user
    );
    return (
        <main className="min-h-screen">
            PulseApp Dashboard, hello {user?.email}
        </main>
    );
};
export default DashboardPage;
