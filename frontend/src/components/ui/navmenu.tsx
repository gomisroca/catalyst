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
    const { user } = useUser()
    console.log(user)
    return(
        <>
        <header>
            <div className="w-fit m-auto flex p-4">
                <ModeToggle/>
                <Dialog>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="icon">
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
                            <p>Settings</p>
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