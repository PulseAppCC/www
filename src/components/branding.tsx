import Link from "next/link";
import Image from "next/image";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * The variants of the branding.
 */
const brandingVariants = cva(
    "relative group-hover:opacity-75 hover:opacity-75 select-none transition-all transform-gpu",
    {
        variants: {
            size: {
                xs: "w-10 h-10",
                sm: "w-16 h-16",
                default: "w-24 h-24",
                lg: "w-32 h-32",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
);

/**
 * The props for this component.
 */
type BrandingProps = {
    /**
     * The href to go to when clicked.
     */
    href?: string;

    /**
     * The size of the branding.
     */
    size?: "xs" | "sm" | "default" | "lg";

    /**
     * The optional class name to apply to the branding.
     */
    className?: string;
};

const Branding = ({ href, size, className }: BrandingProps) => (
    <Link
        className={cn(brandingVariants({ size, className }))}
        href={href ?? "/"}
        draggable={false}
    >
        <Image
            src="/media/logo.png"
            alt="Pulse App Logo"
            fill
            priority
            draggable={false}
        />
    </Link>
);
export default Branding;
