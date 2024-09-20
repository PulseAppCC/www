import { ReactElement } from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * The skeleton to indicate the
 * loading of the user's devices.
 *
 * @param index the skeleton index
 * @return the skeleton jsx
 */
const DevicesSkeleton = ({ index }: { index: number }): ReactElement => (
    <div style={{ opacity: 0.5 - 0.14 * index }}>
        <Skeleton className="h-[4rem] rounded-lg" />
    </div>
);
export default DevicesSkeleton;
