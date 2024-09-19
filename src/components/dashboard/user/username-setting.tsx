import { ReactElement } from "react";
import { User } from "@/app/types/user/user";
import { useUserContext } from "@/app/provider/user-provider";
import { UserState } from "@/app/store/user-store";
import { Input } from "@/components/ui/input";

/**
 * The setting that allows a
 * {@link User} to view their
 * username.
 *
 * @return the setting jsx
 */
const UsernameSetting = (): ReactElement => {
    const user: User | undefined = useUserContext(
        (state: UserState) => state.user
    );
    return (
        <div className="px-5 flex items-center">
            {/* Name & Description */}
            <div className="w-96 flex flex-col gap-0.5 select-none pointer-events-none">
                <h1 className="text-lg font-bold">Username</h1>
                <p className="max-w-64 text-sm opacity-75">
                    The username used to identify you on the app.
                </p>
            </div>

            {/* Setting */}
            <Input
                className="w-60 rounded-lg select-none"
                value={user?.username}
                disabled
            />
        </div>
    );
};
export default UsernameSetting;
