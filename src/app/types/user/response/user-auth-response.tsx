import { User } from "@/app/types/user/user";
import { Session } from "@/app/types/user/session";

/**
 * The response for successfully logging in.
 */
export type UserAuthResponse = {
    /**
     * The created session for the user.
     */
    session: Session;

    /**
     * The user logging in.
     */
    user: User;
};
