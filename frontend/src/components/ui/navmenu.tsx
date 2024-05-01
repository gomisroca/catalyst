import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { SignInForm } from "../user/signin-form"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { useUser } from "@/contexts/user-provider"
import { UserSettingsForm } from "../user/user-settings-form"
import { FiFolderPlus } from "react-icons/fi"
import { ProjectUploadForm } from "../project/project-upload-form"
import UserMenuButton from "../user/user-menu-button"
import SignInButton from "../user/signin-button"
import { Home } from "lucide-react"

export default function Navmenu(){
    const { user } = useUser();

    return(
        <>
        <header>
            <div className="w-fit m-auto flex p-4 gap-1">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button className="w-[40px]" size='icon' variant='outline'>
                                <Home className="w-[40px]" onClick={() => window.location.href = '/'} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            Home
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <ModeToggle />
                <Dialog>
                    {user ?
                    <UserMenuButton user={user}  />
                    :
                    <SignInButton />}
                    <DialogContent className="w-5/6 rounded-md">
                        { user ? <UserSettingsForm /> : <SignInForm /> }
                    </DialogContent>
                </Dialog>
                {user &&
                <Dialog>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
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
                    <DialogContent className="w-5/6 rounded-md">
                        <ProjectUploadForm />
                    </DialogContent>
                </Dialog>}
            </div>
        </header>
        </>
    )
}