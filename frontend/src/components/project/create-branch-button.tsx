import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BranchUploadForm } from "@/components/project/branch-upload-form";
import { useState } from "react";

export default function CreateBranchButton({ project }: { project: Project }){
    const [open, setOpen] = useState(false);

    const handleSubmitSuccess = () => {
        setOpen(false)
    }

    return( 
        <Dialog open={open} onOpenChange={setOpen}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <DialogTrigger asChild>
                            <Button variant='outline' className="flex items-center">
                                <FiPlus className="mr-2 h-4 w-4" /> Add Branch
                            </Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        Add Branch
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DialogContent className="w-5/6 rounded-md">
                <BranchUploadForm onSubmitSuccess={handleSubmitSuccess} project={project} />
            </DialogContent>
        </Dialog>
    )
}