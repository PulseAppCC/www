import { ReactElement } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

/**
 * The not found page.
 *
 * @return the page jsx
 */
const NotFoundPage = (): ReactElement => (
    <main className="min-h-screen flex justify-center items-center select-none">
        <div className="flex gap-10">
            {/* Image */}
            <Image
                src="/media/mike.png"
                alt="Mike Wazowski"
                width={128}
                height={128}
                draggable={false}
            />

            {/* Message */}
            <div className="flex flex-col justify-center">
                <div className="flex flex-col gap-0.5 pointer-events-none">
                    <h1 className="text-3xl font-bold">Wrong Door!</h1>
                    <p className="max-w-64 text-lg opacity-75">
                        The page you were looking for could not be found.
                    </p>
                </div>
                <Link className="mt-3" href="/dashboard">
                    <Button
                        className="p-0 gap-2 hover:bg-transparent hover:opacity-75 transition-all transform-gpu"
                        variant="ghost"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Return to App
                    </Button>
                </Link>
            </div>
        </div>
    </main>
);
export default NotFoundPage;
