import { ReactElement } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

/**
 * The props for this oauth provider.
 */
type OAuthProviderProps = {
    /**
     * The name of this provider.
     */
    name: string;

    /**
     * The link to login with this provider.
     */
    link: string;
};

/**
 * A button to login with an OAuth provider.
 *
 * @return the provider jsx
 */
const OAuthProvider = ({ name, link }: OAuthProviderProps): ReactElement => (
    <Link className="cursor-not-allowed" href={link}>
        <Button
            className="w-32 h-12 flex gap-2.5 bg-zinc-800/85 text-white border border-zinc-700/35 hover:bg-muted hover:opacity-75 transition-all transform-gpu"
            disabled
        >
            <Image
                src={`/media/platforms/${name.toLowerCase()}.svg`}
                alt={`${name}'s Logo`}
                width={24}
                height={24}
            />
            <span>{name}</span>
        </Button>
    </Link>
);
export default OAuthProvider;
