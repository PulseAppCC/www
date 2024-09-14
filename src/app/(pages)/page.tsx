import { ReactElement } from "react";
import Greeting from "@/components/landing/greeting";

const LandingPage = (): ReactElement => (
    <main className="min-h-[100vh]">
        <Greeting />
    </main>
);
export default LandingPage;
