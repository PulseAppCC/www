import { User } from "@/app/types/user/user";
import { UserFlag } from "@/app/types/user/user-flag";

/**
 * Check if a user has a flag.
 *
 * @param user the user to check
 * @param flag the flag to check
 * @return whether the user has the flag
 */
export const hasFlag = (user: User, flag: UserFlag): boolean =>
    (user.flags & flag) == flag;
