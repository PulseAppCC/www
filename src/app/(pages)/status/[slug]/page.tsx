import { ReactElement } from "react";

const StatusPage = ({ params }: { params: { slug: string } }): ReactElement => {
    return <main className="min-h-screen">{params.slug}</main>;
};
export default StatusPage;
