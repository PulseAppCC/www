import Greeting from "@/components/landing/greeting";
import { ReactElement } from "react";

const LandingPage = (): ReactElement => (
    <main className="px-3 min-h-[100vh] bg-background">
        <Greeting />
    </main>
);
export default LandingPage;
