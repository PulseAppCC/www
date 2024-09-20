import { ReactElement } from "react";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import StatusPageList from "@/components/dashboard/org/status-page/status-page-list";

const StatusPagesPage = (): ReactElement => (
    <main className="h-full flex flex-col gap-10">
        <DashboardHeader title="Status Pages" />
        <StatusPageList />
    </main>
);
export default StatusPagesPage;
