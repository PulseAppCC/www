"use client";

import {
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import createUserStore, {
    UserContext,
    UserState,
    UserStore,
} from "@/app/store/user-store";
import { User } from "@/app/types/user/user";
import { Cookies, useCookies } from "next-client-cookies";
import { Session } from "@/app/types/user/session";
import { apiRequest } from "@/lib/api";
import { StoreApi, useStore } from "zustand";
import { usePathname, useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import DashboardLoader from "@/components/dashboard/loader";
import { hasFlag } from "@/lib/user";
import { UserFlag } from "@/app/types/user/user-flag";

/**
 * The provider that will provide user context to children.
 *
 * @param children the children to provide context to
 * @return the provider
 */
const UserProvider = ({ children }: { children: ReactNode }) => {
    const storeRef = useRef<UserStore>();
    const [authorized, setAuthorized] = useState<boolean>(false);
    const cookies: Cookies = useCookies();
    const router: AppRouterInstance = useRouter();
    const path: string = usePathname();
    if (!storeRef.current) {
        storeRef.current = createUserStore();
    }

    /**
     * Fetch the user from the stored session in their browser.
     */
    const fetchUser = useCallback(async () => {
        const rawSession: string | undefined = cookies.get("session");

        // No session cookie, go back to auth
        if (!rawSession) {
            router.push("/auth");
            return;
        }
        const session: Session = JSON.parse(rawSession) as Session;
        const { data, error } = await apiRequest<User>({
            endpoint: "/user/@me",
            session,
        });
        // Failed to login (unauthorized?)
        if (error) {
            cookies.remove("session");
            router.push("/auth");
            return;
        }
        // User successfully authenticated
        const user: User = data as User;
        storeRef.current?.getState().authorize(session, user);
        setAuthorized(true);

        // User has not yet completed onboarding
        if (
            !hasFlag(user, UserFlag.COMPLETED_ONBOARDING) &&
            !path.startsWith("/dashboard/onboarding")
        ) {
            router.push("/dashboard/onboarding");
        }
    }, [cookies, router, path]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <UserContext.Provider value={storeRef.current}>
            {authorized ? children : <DashboardLoader />}
        </UserContext.Provider>
    );
};

/**
 * Use the user context.
 *
 * @param selector the state selector to use
 * @return the value returned by the selector
 */
export function useUserContext<T>(selector: (state: UserState) => T): T {
    const store: StoreApi<UserState> | null = useContext(UserContext);
    if (!store) {
        throw new Error("Missing UserContext.Provider in the tree");
    }
    return useStore(store, selector);
}

export default UserProvider;
