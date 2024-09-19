"use client";

import { ReactNode, useCallback, useContext, useEffect, useRef } from "react";
import { UserState } from "@/app/store/user-store";
import { User } from "@/app/types/user/user";
import { StoreApi, useStore } from "zustand";
import createOrganizationStore, {
    OrganizationContext,
    OrganizationState,
    OrganizationStore,
} from "@/app/store/organization-store";
import { apiRequest } from "@/lib/api";
import { Organization } from "@/app/types/org/organization";
import { useUserContext } from "@/app/provider/user-provider";
import { Session } from "@/app/types/user/session";

/**
 * The provider that will provide organization context to children.
 *
 * @param children the children to provide context to
 * @return the provider
 */
const OrganizationProvider = ({ children }: { children: ReactNode }) => {
    const session: Session | undefined = useUserContext(
        (state: UserState) => state.session
    );
    const user: User | undefined = useUserContext(
        (state: UserState) => state.user
    );

    const storeRef = useRef<OrganizationStore>();
    if (!storeRef.current) {
        storeRef.current = createOrganizationStore();
    }

    /**
     * Fetch the organizations for the logged in user.
     */
    const fetchOrganizations = useCallback(async () => {
        let selectedOrganization: string | null = localStorage.getItem(
            "selected-organization"
        );
        const { data, error } = await apiRequest<Organization[]>({
            endpoint: "/organization/@me",
            session,
        });
        const organizations: Organization[] = data as Organization[];
        if (!selectedOrganization && organizations.length > 0) {
            selectedOrganization = organizations[0].snowflake;
        }
        storeRef.current
            ?.getState()
            .update(selectedOrganization || undefined, organizations);
    }, [session]);

    useEffect(() => {
        fetchOrganizations();
    }, [fetchOrganizations]);

    return (
        <OrganizationContext.Provider value={storeRef.current}>
            {children}
        </OrganizationContext.Provider>
    );
};

/**
 * Use the organization context.
 *
 * @param selector the state selector to use
 * @return the value returned by the selector
 */
export function useOrganizationContext<T>(
    selector: (state: OrganizationState) => T
): T {
    const store: StoreApi<OrganizationState> | null =
        useContext(OrganizationContext);
    if (!store) {
        throw new Error("Missing OrganizationContext.Provider in the tree");
    }
    return useStore(store, selector);
}

export default OrganizationProvider;
