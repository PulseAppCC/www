import { ReactElement } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SimpleTooltip from "@/components/simple-tooltip";

const CreateStatusPageDialog = (): ReactElement => {
    return (
        <Dialog>
            <DialogTrigger>
                <SimpleTooltip content="Create a new status page">
                    <Button className="w-20" variant="outline" size="sm">
                        Create
                    </Button>
                </SimpleTooltip>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
export default CreateStatusPageDialog;
