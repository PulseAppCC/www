"use client";

import { ReactElement } from "react";
import { UserState } from "@/app/store/user-store";
import { User } from "@/app/types/user/user";
import { useUserContext } from "@/app/provider/user-provider";

/**
 * The dashboard home page.
 *
 * @return the page jsx
 */
const DashboardPage = (): ReactElement => {
    const user: User | undefined = useUserContext(
        (state: UserState) => state.user
    );
    return <main>Hi there {user?.username}, welcome to Pulse App!</main>;
};
export default DashboardPage;
