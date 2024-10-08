import { createStore } from "zustand";
import { User } from "@/app/types/user/user";
import { createContext } from "react";
import { Session } from "@/app/types/user/session";

/**
 * The context to provide this store.
 */
export const UserContext = createContext<UserStore | null>(null);

/**
 * The props in this store.
 */
export type UserStoreProps = {
    /**
     * The user's session, if any.
     */
    session: Session | undefined;

    /**
     * The user obtained from the session, if any.
     */
    user: User | undefined;
};

/**
 * The user store state.
 */
export type UserState = UserStoreProps & {
    /**
     * Authorize the user.
     *
     * @param session the user's session
     * @param user the user
     */
    authorize: (session: Session, user: User) => void;
};

/**
 * The type representing the user store.
 */
export type UserStore = ReturnType<typeof createUserStore>;

/**
 * Create a new user store.
 */
const createUserStore = () => {
    const defaultProps: UserStoreProps = {
        session: undefined,
        user: undefined,
    };
    return createStore<UserState>()((set) => ({
        ...defaultProps,
        authorize: (session: Session, user: User) =>
            set(() => ({ session, user })),
    }));
};
export default createUserStore;
