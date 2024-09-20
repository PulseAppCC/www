import { ReactElement } from "react";
import UserAvatar from "@/components/user/user-avatar";
import { User } from "@/app/types/user/user";
import { useUserContext } from "@/app/provider/user-provider";
import { UserState } from "@/app/store/user-store";

/**
 * The setting that allows a
 * {@link User} to change their
 * avatar.
 *
 * @return the setting jsx
 */
const AvatarSetting = (): ReactElement => {
    const user: User | undefined = useUserContext(
        (state: UserState) => state.user
    );
    return (
        <div className="px-5 flex items-center">
            {/* Name & Description */}
            <div className="w-96 flex flex-col gap-0.5 select-none pointer-events-none">
                <h1 className="text-lg font-bold">Avatar</h1>
                <p className="max-w-64 text-sm opacity-75">
                    Set a profile picture for your account. This can be seen by
                    other users.
                </p>
            </div>

            {/* Setting */}
            <UserAvatar
                className="select-none pointer-events-none"
                user={user as User}
            />
        </div>
    );
};
export default AvatarSetting;
