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

export default function Navmenu(){
    const { user } = useUser();
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
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <DialogTrigger asChild>
                                    <Button className="cursor-pointer" variant="outline" size="icon" asChild>
                                        {user ?
                                            <Avatar className="rounded-md hover:contrast-50 p-[0.2rem]">
                                                <AvatarImage className="rounded-sm" src={`${import.meta.env.VITE_BACKEND_ORIGIN}/${user.avatar}`} />
                                                <AvatarFallback>{user.username[0]}</AvatarFallback>
                                            </Avatar>
                                        :
                                        <UserRound />}
                                    </Button>
                                </DialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent>
                                {user ? 
                                <p>Account Settings</p>
                                :
                                <p>Sign In</p>}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <DialogContent>
                        {user ?
                        <UserSettingsForm />
                        :
                        <SignInForm />}
                    </DialogContent>
                </Dialog>
            </div>
        </header>
        </>
    )
}