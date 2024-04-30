import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { SignInForm } from "../user/signin-form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { UserRound } from "lucide-react"
import { useUser } from "@/contexts/user-provider"
import { UserSettingsForm } from "../user/user-settings-form"
import { FiFolderPlus } from "react-icons/fi"
import { ProjectUploadForm } from "../project/project-upload-form"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu"

export default function Navmenu(){
    const { user, signOut } = useUser();
    return(
        <>
        <header>
            <div className="w-fit m-auto flex p-4 gap-1">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <ModeToggle/>
                        </TooltipTrigger>
                        <TooltipContent>
                            Toggle Theme
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <Dialog>
                    {user ?
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="cursor-pointer" variant="outline" size="icon" asChild>
                                <Avatar className="rounded-md hover:contrast-50 p-[0.2rem]">
                                    <AvatarImage className="rounded-sm" src={`${import.meta.env.VITE_BACKEND_ORIGIN}/${user.avatar}`} />
                                    <AvatarFallback>{user.username[0]}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <DialogTrigger className="w-full text-start">
                                    Settings
                                </DialogTrigger>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => signOut()}>
                                Sign Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    :
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <DialogTrigger className="w-full">
                                    <Button className="cursor-pointer" variant="outline" size="icon" asChild>
                                        <UserRound />
                                    </Button>
                                </DialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Sign In</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>}
                    <DialogContent>
                        { user ? <UserSettingsForm /> : <SignInForm /> }
                    </DialogContent>
                </Dialog>
                {user &&
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
                </Dialog>}
            </div>
        </header>
        </>
    )
}