"use client";

import { ReactElement } from "react";
import { UserState } from "@/app/store/user-store";
import { User } from "@/app/types/user/user";
import { useUserContext } from "@/app/provider/user-provider";
import { useOrganizationContext } from "@/app/provider/organization-provider";
import { OrganizationState } from "@/app/store/organization-store";

const DashboardPage = (): ReactElement => {
    const user: User | undefined = useUserContext(
        (state: UserState) => state.user
    );
    const selectedOrganization: string | undefined = useOrganizationContext(
        (state: OrganizationState) => state.selected
    );
    return (
        <main>
            PulseApp Dashboard, hello {user?.email}, selected org:{" "}
            {selectedOrganization}
        </main>
    );
};
export default DashboardPage;
