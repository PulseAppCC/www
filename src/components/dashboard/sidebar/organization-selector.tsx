"use client";

import * as React from "react";
import { ReactElement, useEffect, useState } from "react";
import { ChevronsUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useOrganizationContext } from "@/app/provider/organization-provider";
import { OrganizationState } from "@/app/store/organization-store";
import { Organization } from "@/app/types/org/organization";
import { CheckIcon } from "@heroicons/react/24/outline";
import OrganizationLogo from "@/components/org/organization-logo";

/**
 * The organization selector.
 *
 * @return the selector jsx
 */
const OrganizationSelector = (): ReactElement => {
    const selectedOrganization: string | undefined = useOrganizationContext(
        (state: OrganizationState) => state.selected
    );
    const setSelectedOrganization = useOrganizationContext(
        (state) => state.setSelected
    );
    const organizations: Organization[] = useOrganizationContext(
        (state: OrganizationState) => state.organizations
    );
    const [open, setOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<Organization | undefined>();

    // Set the selected organization
    useEffect(() => {
        const toSelect: Organization | undefined = organizations.find(
            (organization: Organization) => {
                return organization.snowflake === selectedOrganization;
            }
        );
        // Update the state for this page
        setSelected(
            toSelect ||
                (organizations.length > 0 ? organizations[0] : undefined)
        );

        // Update the state for all pages
        if (!toSelect && organizations.length > 0) {
            setSelectedOrganization(organizations[0].snowflake);
        }
    }, [organizations, selectedOrganization]);

    /**
     * Handle selecting an organization.
     *
     * @param organization the selected organization
     */
    const selectOrganization = (organization: Organization) => {
        setOpen(false);
        setSelected(organization);
        setSelectedOrganization(organization.snowflake);
        localStorage.setItem("selected-organization", organization.snowflake);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    className="w-52 bg-background/30 justify-between"
                    aria-expanded={open}
                    variant="outline"
                    role="combobox"
                >
                    {selected ? (
                        <div className="flex gap-2.5 items-center">
                            <OrganizationLogo
                                organization={selected}
                                size="sm"
                            />
                            {selected.name}
                        </div>
                    ) : (
                        "Select organization..."
                    )}
                    <ChevronsUpDownIcon className="ml-2 w-4 h-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-52">
                <Command>
                    <CommandInput placeholder="Search organization..." />
                    <CommandList>
                        <CommandEmpty>No organizations found.</CommandEmpty>
                        <CommandGroup>
                            {organizations.map(
                                (organization: Organization, index: number) => (
                                    <CommandItem
                                        key={index}
                                        className="flex gap-2 items-center"
                                        value={organization.name}
                                        onSelect={(currentValue: string) =>
                                            selectOrganization(
                                                organizations.find(
                                                    (organization) =>
                                                        organization.name ===
                                                        currentValue
                                                ) as Organization
                                            )
                                        }
                                    >
                                        <OrganizationLogo
                                            organization={organization}
                                            size="sm"
                                        />
                                        {organization.name}
                                        {organization.snowflake ===
                                            selectedOrganization && (
                                            <CheckIcon className="mx-auto w-4 h-4" />
                                        )}
                                    </CommandItem>
                                )
                            )}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
export default OrganizationSelector;
