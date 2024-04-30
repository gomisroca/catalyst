import { ProjectUploadForm } from "../project/project-upload-form";
import { Button } from "./button";
import { Dialog, DialogTrigger, DialogContent } from "./dialog";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "./tooltip";
import { FiFolderPlus, FiFilePlus } from "react-icons/fi";
import { LuGitBranchPlus } from "react-icons/lu";

export default function Sidebar(){
    return (
        <>
        {/* <div className="absolute w-fit top-[8rem] right-0 flex p-4 gap-1 flex-col">
            <Dialog>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <FiFolderPlus />
                                </Button>
                            </DialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                            Create Project
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <DialogContent>
                    <ProjectUploadForm />
                </DialogContent>
            </Dialog>
            <Dialog>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <LuGitBranchPlus />
                                </Button>
                            </DialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                            Create Branch
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <DialogContent>
                    <ProjectUploadForm />
                </DialogContent>
            </Dialog>
            <Dialog>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <FiFilePlus />
                                </Button>
                            </DialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                            Create Post
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <DialogContent>
                    <ProjectUploadForm />
                </DialogContent>
            </Dialog>
        </div> */}
        </>
    )
}