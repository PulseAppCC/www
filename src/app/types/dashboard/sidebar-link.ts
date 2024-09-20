import { ReactElement } from "react";

/**
 * A link on the dashboard sidebar.
 */
export type SidebarLink = {
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
