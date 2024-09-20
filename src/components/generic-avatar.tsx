import * as React from "react";
import { ReactElement } from "react";
import { cva } from "class-variance-authority";
import Image from "next/image";
import InitialsAvatar from "react-initials-avatar";
import { cn } from "@/lib/utils";

/**
 * The variants of the avatar.
 */
const avatarVariants = cva("relative rounded-full", {
    variants: {
        size: {
            sm: "w-6 h-6",
            default: "w-11 h-11",
        },
    },
    defaultVariants: {
        size: "default",
    },
});

/**
 * The props for the avatar.
 */
export type GenericAvatarProps = {
    /**
     * The image URL of the
     * avatar to display, if any.
     */
    image?: string | undefined;

    /**
     * The alt text for the image.
     */
    imageAlt?: string;

    /**
     * The backup text to extract initials
     * from if the avatar image is unavailable.
     */
    initialsText: string;

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
 * @param props the avatar props
 * @return the avatar jsx
 */
const GenericAvatar = ({
    image,
    imageAlt,
    initialsText,
    size,
    className,
}: GenericAvatarProps): ReactElement => (
    <div className={cn(avatarVariants({ size, className }))}>
        {image ? (
            <Image
                className="rounded-full"
                src={image}
                alt={imageAlt ?? ""}
                fill
            />
        ) : (
            <InitialsAvatar
                className="w-full h-full flex justify-center items-center bg-muted rounded-full"
                name={initialsText}
            />
        )}
    </div>
);
export default GenericAvatar;
