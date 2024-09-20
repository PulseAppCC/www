import * as React from "react";
import { ReactElement } from "react";
import { User } from "@/app/types/user/user";
import GenericAvatar from "@/components/generic-avatar";

/**
 * The props for the avatar.
 */
type UserAvatarProps = {
    /**
     * The user to show the avatar for.
     */
    user: User;
} & Omit<
    React.ComponentProps<typeof GenericAvatar>,
    "image" | "imageAlt" | "initialsText"
>;

/**
 * The avatar for a user.
 *
 * @param user the user to show the avatar for
 * @param props additional props
 * @return the avatar jsx
 */
const UserAvatar = ({ user, ...props }: UserAvatarProps): ReactElement => (
    <GenericAvatar
        image={
            user.avatar &&
            `${process.env.NEXT_PUBLIC_CDN_ENDPOINT}/avatars/${user.avatar}.webp`
        }
        imageAlt={`${user.username}'s Avatar`}
        initialsText={user.username}
        {...props}
    />
);
export default UserAvatar;
