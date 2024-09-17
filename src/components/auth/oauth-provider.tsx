import { ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { SocialIcon } from "react-social-icons";
import Link from "next/link";

/**
 * The props for this oauth provider.
 */
type OAuthProviderProps = {
    /**
     * The name of this provider.
     */
    name: string;

    /**
     * The icon of this provider.
     */
    icon: string;

    /**
     * The link to login with this provider.
     */
    link: string;
};

const OAuthProvider = ({
    name,
    icon,
    link,
}: OAuthProviderProps): ReactElement => (
    <Link href={link}>
        <Button
            className="h-12 bg-zinc-800/85 text-white border border-zinc-700/35 hover:bg-muted hover:opacity-75 transition-all transform-gpu"
            disabled
        >
            <SocialIcon
                className="w-10 h-10"
                as="div"
                bgColor="transparent"
                network={icon}
            />
            <span>{name}</span>
        </Button>
    </Link>
);
export default OAuthProvider;
