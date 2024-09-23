"use client";

import * as React from "react";
import { ReactElement, useState } from "react";
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
    const organizations: Organization[] = useOrganizationContext(
        (state: OrganizationState) => state.organizations
    );
    const selected: Organization | undefined = useOrganizationContext(
        (state: OrganizationState) => state.selected
    );
    const setSelected = useOrganizationContext((state) => state.setSelected);
    const [open, setOpen] = useState<boolean>(false);

    /**
     * Handle selecting an organization.
     *
     * @param organization the selected organization
     */
    const selectOrganization = (organization: Organization) => {
        setOpen(false);
        setSelected(organization);
        localStorage.setItem("selected-organization", organization.snowflake);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    className="px-1.5 w-14 md:w-52 md:px-4 bg-background/30 justify-between transition-all transform-gpu"
                    aria-expanded={open}
                    variant="outline"
                    role="combobox"
                >
                    {selected ? (
                        <div className="flex gap-1 items-center">
                            <OrganizationLogo
                                organization={selected}
                                size="sm"
                            />
                            <span className="hidden md:flex">
                                {selected.name}
                            </span>
                        </div>
                    ) : (
                        "Select organization..."
                    )}
                    <ChevronsUpDownIcon className="md:ml-2 w-4 h-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0">
                <Command>
                    <CommandInput placeholder="Search organization..." />
                    <CommandList>
                        <CommandEmpty>No organizations found.</CommandEmpty>
                        <CommandGroup>
                            {organizations?.map(
                                (organization: Organization, index: number) => (
                                    <CommandItem
                                        key={index}
                                        className="px-3.5 relative flex gap-2.5 items-center"
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
                                        {organization === selected && (
                                            <CheckIcon className="absolute right-3.5 w-4 h-4" />
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
