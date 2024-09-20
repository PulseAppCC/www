import { ReactElement } from "react";

/**
 * A link in the user menu on the dashboard.
 */
export type UserMenuLink = {
    /**
     * The name of this link.
     */
    name: string;

    /**
     * The icon for this link.
     */
    icon: ReactElement;

    /**
     * The href for this link.
     */
    href: string;
};
