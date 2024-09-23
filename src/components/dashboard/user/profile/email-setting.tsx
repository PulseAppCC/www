import { ReactElement } from "react";
import { User } from "@/app/types/user/user";
import { useUserContext } from "@/app/provider/user-provider";
import { UserState } from "@/app/store/user-store";
import { Input } from "@/components/ui/input";

/**
 * The setting that allows a
 * {@link User} to view their
 * email.
 *
 * @return the setting jsx
 */
const EmailSetting = (): ReactElement => {
    const user: User | undefined = useUserContext(
        (state: UserState) => state.user
    );
    return (
        <div className="flex flex-col gap-3 lg:flex-row items-start lg:items-center">
            {/* Name & Description */}
            <div className="w-96 flex flex-col gap-0.5 select-none pointer-events-none transition-all transform-gpu">
                <h1 className="text-lg font-bold">Email</h1>
                <p className="max-w-64 text-sm opacity-75">
                    The email you use to login to this account.
                </p>
            </div>

            {/* Setting */}
            <Input
                className="max-w-60 rounded-lg select-none"
                value={user?.email}
                disabled
            />
        </div>
    );
};
export default EmailSetting;
