import { userMenuLinks } from "@/components/dashboard/sidebar/user-menu/user-menu";
import Link from "next/link";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ReactElement } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserMenuLink } from "@/app/types/dashboard/user-menu-link";

const UserMenuLinks = (): ReactElement => {
    const path: string = usePathname();
    return (
        <>
            {userMenuLinks.map((link: UserMenuLink, index: number) => {
                const active = path.startsWith(link.href);
                return (
                    <Link key={index} href={link.href} draggable={false}>
                        <DropdownMenuItem
                            className={cn(
                                "gap-2.5 cursor-pointer",
                                active && "opacity-70"
                            )}
                        >
                            <div className="relative w-5 h-5">{link.icon}</div>
                            <span>{link.name}</span>
                        </DropdownMenuItem>
                    </Link>
                );
            })}
        </>
    );
};
export default UserMenuLinks;
