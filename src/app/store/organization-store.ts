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
     * The organization's the user has.
     */
    organizations: Organization[];

    /**
     * The currently selected organization.
     */
    selected: Organization | undefined;
};

/**
 * The organization store state.
 */
export type OrganizationState = OrganizationStoreProps & {
    /**
     * Update the state.
     *
     * @param organizations the user's organizations
     * @param selected the selected organization
     */
    update: (
        organizations: Organization[],
        selected: Organization | undefined
    ) => void;

    /**
     * Set the selected organization.
     *
     * @param selected the selected organization
     */
    setSelected: (selected: Organization | undefined) => void;
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
        update: (
            organizations: Organization[],
            selected: Organization | undefined
        ) => set(() => ({ organizations, selected })),
        setSelected: (selected: Organization | undefined) =>
            set(() => ({ selected })),
    }));
};
export default createOrganizationStore;
