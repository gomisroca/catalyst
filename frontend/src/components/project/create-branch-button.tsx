import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BranchUploadForm } from "@/components/project/branch-upload-form";

export default function CreateBranchButton({ project }: { project: Project }){
    return( 
        <Dialog>
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
                <BranchUploadForm  project={project} />
            </DialogContent>
        </Dialog>
    )
}