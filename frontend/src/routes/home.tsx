import HomeBasic from "@/components/home/basic"
import HomeTimeline from "@/components/home/timeline";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useUser } from "@/contexts/user-provider"

export default function Home(){
    const { user } = useUser();

    return(
        <Tabs defaultValue="basic" className="w-full flex flex-col items-center">
            <TabsList className="self-center w-3/4">
                <TabsTrigger value="basic" className="w-1/2">Home</TabsTrigger>
                {!user && 
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="w-1/2 cursor-default">
                                <TabsTrigger disabled value="timeline">For You</TabsTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                            You must be logged in to see your timeline.
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>}
                {user && 
                <TabsTrigger value="timeline" className="w-1/2">For You</TabsTrigger>}
            </TabsList>
            <TabsContent value="basic" className="w-full">
                <HomeBasic />
            </TabsContent>
            <TabsContent value="timeline" className="w-full">
                <HomeTimeline />
            </TabsContent>
        </Tabs>
    )
}