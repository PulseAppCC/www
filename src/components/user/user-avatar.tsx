import * as React from "react";
import { ReactElement } from "react";
import { cva } from "class-variance-authority";
import Image from "next/image";
import InitialsAvatar from "react-initials-avatar";
import { cn } from "@/lib/utils";
import { User } from "@/app/types/user/user";

/**
 * The variants of the avatar.
 */
const avatarVariants = cva("relative rounded-full", {
    variants: {
        size: {
            sm: "w-6 h-6",
            default: "w-10 h-10",
        },
    },
    defaultVariants: {
        size: "default",
    },
});

/**
 * The props for this component.
 */
type UserAvatarProps = {
    /**
     * The user to show the avatar for.
     */
    user: User;

    /**
     * The size of the avatar.
     */
    size?: "sm" | "default";

    /**
     * The optional class name to apply to the logo.
     */
    className?: string;
};

/**
 * An avatar for a user.
 *
 * @param user the user
 * @param size the size
 * @param className additional class names
 * @return the avatar jsx
 */
const UserAvatar = ({
    user,
    size,
    className,
}: UserAvatarProps): ReactElement => (
    <div className={cn(avatarVariants({ size, className }))}>
        {user.avatar ? (
            <Image
                className="rounded-full"
                src={`${process.env.NEXT_PUBLIC_CDN_ENDPOINT}/avatars/${user.avatar}.webp`}
                alt={`${user.username}'s Avatar`}
                fill
            />
        ) : (
            <InitialsAvatar name={user.username} />
        )}
    </div>
);
export default UserAvatar;
