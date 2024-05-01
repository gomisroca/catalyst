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
                            <Button variant='outline' size='icon' asChild>
                                <FiPlus className="p-2" />
                            </Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        Create Branch
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DialogContent>
                <BranchUploadForm  project={project} />
            </DialogContent>
        </Dialog>
    )
}