import { ReactElement } from "react";
import Link from "next/link";

/**
 * The auth footer.
 *
 * @return the footer jsx
 */
const Footer = (): ReactElement => (
    <footer className="flex justify-center text-center">
        <p className="max-w-[17rem] opacity-95 select-none">
            By registering you agree to our{" "}
            <DocumentLink name="Terms and Conditions" link="/legal/terms" /> and
            our <DocumentLink name="Privacy Policy" link="/legal/privacy" />.
        </p>
    </footer>
);

const DocumentLink = ({ name, link }: { name: string; link: string }) => (
    <Link
        className="text-red-500 hover:opacity-85 transition-all transform-gpu"
        href={link}
    >
        {name}
    </Link>
);

export default Footer;
