import { createStore } from "zustand";
import { createContext } from "react";
import { Organization } from "@/app/types/org/organization";

/**
 * The context to provide this store.
 */
export const OrganizationContext = createContext<OrganizationStore | null>(
    null
);

/**
 * The props in this store.
 */
export type OrganizationStoreProps = {
    /**
     * The currently selected organization.
     */
    selected: string | undefined;

    /**
     * The organization's the user has.
     */
    organizations: Organization[];
};

/**
 * The organization store state.
 */
export type OrganizationState = OrganizationStoreProps & {
    /**
     * Update the state.
     *
     * @param selected the selected organization
     * @param organizations the user's organizations
     */
    update: (
        selected: string | undefined,
        organizations: Organization[]
    ) => void;

    /**
     * Set the selected organization.
     *
     * @param selected the selected organization
     */
    setSelected: (selected: string | undefined) => void;
};

/**
 * The type representing the organization store.
 */
export type OrganizationStore = ReturnType<typeof createOrganizationStore>;

/**
 * Create a new user store.
 */
const createOrganizationStore = () => {
    const defaultProps: OrganizationStoreProps = {
        selected: undefined,
        organizations: [],
    };
    return createStore<OrganizationState>()((set) => ({
        ...defaultProps,
        update: (selected: string | undefined, organizations: Organization[]) =>
            set(() => ({ selected, organizations })),
        setSelected: (selected: string | undefined) =>
            set(() => ({ selected })),
    }));
};
export default createOrganizationStore;
