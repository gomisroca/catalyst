import { useUser } from "@/contexts/user-provider";
import { getUserFollows } from "@/lib/users";
import { useEffect, useState } from "react";
import Cookies  from 'js-cookie';

export default function HomeTimeline(){
    const { user } = useUser();
    const accessToken = Cookies.get('__catalyst__jwt');
    const [follows, setFollows] = useState<User[]>([]);
    const [timeline, setTimeline] = useState();

    useEffect(() => {
        async function getFollows(accessToken: string){
            // Need to pass more data here
            // Interactions, posts, branches, projects, from all followed users
            const userFollows = await getUserFollows(accessToken);
            setFollows(userFollows);
        }
        if(accessToken){
            getFollows(accessToken)
        }
    }, [accessToken])

    useEffect(() => {
        // We have an array of users, I think we want to do the same thing, but iterating over all follows, pushing their stuff into a global unsortedTimeline
        // Then we can sort and filter it and it should be fine?

        function createTimeline(follows: User[]): void {
            let unsortedTimeline: (Interaction | Project | Branch | Post)[] = []
            for (const follow of follows){
                const followTimeline: (Interaction | Project | Branch | Post)[] = [
                ...follow.postInteractions, 
                ...follow.branchInteractions, 
                ...follow.projects, 
                ...follow.branches, 
                ...follow.posts];
                unsortedTimeline = unsortedTimeline.concat(followTimeline)
            }
            console.log(unsortedTimeline)

            // const sortedTimeline: InteractionOrProjectOrBranchOrPost[] = unsortedTimeline.sort((a, b) => {
            //     const dateA = a.updatedAt || a.createdAt;
            //     const dateB = b.updatedAt || b.createdAt;
            //     return dateB.localeCompare(dateA);
            // });
            // const filteredTimeline = sortedTimeline.filter(obj => obj.type == 'LIKE' || obj.type == 'SHARE' || obj.content || 
            // (obj.projectId && (obj.permissions?.private == false || user && (obj.author?.id == user.id || obj.permissions?.allowedUsers.includes(user.id)) ) ) || 
            // (obj.name && !obj.projectId && (obj.permissions?.private == false || user && (obj.author?.id == user.id || obj.permissions?.allowedUsers.includes(user.id)) ) ) );
            // setTimeline(filteredTimeline);
        }

        if(user && follows){
            createTimeline(follows)
        }
    }, [user, follows])
    
    return(
        <div className="flex flex-col gap-4 w-full">
            
        </div>
    )
}