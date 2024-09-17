import Link from "next/link";
import Image from "next/image";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const brandingVariants = cva(
    "relative hover:opacity-75 transition-all transform-gpu",
    {
        variants: {
            size: {
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
     * The size of the branding.
     */
    size?: "sm" | "default" | "lg";

    /**
     * The optional class name to apply to the branding.
     */
    className?: string;
};

const Branding = ({ size, className }: BrandingProps) => (
    <Link className={cn(brandingVariants({ size, className }))} href="/">
        <Image src="/media/logo.png" alt="PulseApp Logo" fill />
    </Link>
);
export default Branding;
