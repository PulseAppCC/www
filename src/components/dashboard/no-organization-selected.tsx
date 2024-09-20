import { ReactElement } from "react";

/**
 * No organization selected.
 *
 * @return the screen jsx
 */
const NoOrganizationSelected = (): ReactElement => (
    <div className="h-full flex flex-col gap-2 justify-center text-center items-center">
        <h1 className="text-2xl font-bold">No Organization ):</h1>
        <p className="max-w-72 opacity-75">
            It&apos;s a little empty here. Create an organization to get
            started!
        </p>
    </div>
);
export default NoOrganizationSelected;
