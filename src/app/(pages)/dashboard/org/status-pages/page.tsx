import { ReactElement } from "react";
import DashboardHeader from "@/components/dashboard/dashboard-header";

const StatusPagesPage = (): ReactElement => (
    <main className="flex flex-col gap-3">
        <DashboardHeader title="Status Pages" />
    </main>
);
export default StatusPagesPage;
