import { ReactElement } from "react";
import { User } from "@/app/types/user/user";
import { useUserContext } from "@/app/provider/user-provider";
import { UserState } from "@/app/store/user-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { capitalizeWords } from "@/lib/string";

/**
 * The setting that allows a
 * {@link User} to view their
 * tier.
 *
 * @return the setting jsx
 */
const TierSetting = (): ReactElement => {
    const user: User | undefined = useUserContext(
        (state: UserState) => state.user
    );
    return (
        <div className="px-5 flex items-center">
            {/* Name & Description */}
            <div className="w-96 flex flex-col gap-0.5 select-none pointer-events-none">
                <h1 className="text-lg font-bold">Tier</h1>
                <p className="max-w-64 text-sm opacity-75">
                    The tier of your account.
                </p>
            </div>

            {/* Setting */}
            <div className="flex gap-10 items-center">
                <span className="text-sm font-medium select-none pointer-events-none">
                    {capitalizeWords(user?.tier)}
                </span>

                <Link href="/#pricing">
                    <Button
                        className="bg-background/30"
                        size="sm"
                        variant="outline"
                    >
                        View Pricing
                    </Button>
                </Link>
            </div>
        </div>
    );
};
export default TierSetting;
