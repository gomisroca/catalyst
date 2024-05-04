import { Card, CardContent, CardDescription } from "../ui/card";
import { useEffect, useState } from "react";
import { Forward, Star } from "lucide-react";
import { Link } from "react-router-dom";
import TimelineBranchCard from "./timeline-branch-card";
import TimelinePostCard from "./timeline-post-card";
import { FaRegFileAlt } from "react-icons/fa";
import { AiOutlineBranches } from "react-icons/ai";
import TimelineProjectCard from "./timeline-project-card";
import { FiFolderPlus } from "react-icons/fi";

interface InteractionOrProjectOrBranchOrPost{
    createdAt?: string;
    updatedAt?: string;
    type?: InteractionType,
    id?: string;
    userId?: string;
    postId?: string;
    branchId?: string;
    content?: string;
    author?: User;
    media?: string[];
    interactions?: Interaction[];
    projectId?: string;
    name?: string;
    description?: string;
    default?: boolean;
    post?: Post;
    branch?: Branch;
    posts?: Post[];
    parentBranch?: Branch;
    childBranches?: Branch[];
    permissions?: Permissions;
    avatar?: string;
    branches?: Branch[];
}

export default function ProfileTimeline({ profile }: { profile: User }){
    const [timeline, setTimeline] = useState<(InteractionOrProjectOrBranchOrPost)[]>();
    
    function createTimeline(profile: User): void {
        const unsortedTimeline = [
            ...profile.postInteractions, 
            ...profile.branchInteractions, 
            ...profile.projects, 
            ...profile.branches, 
            ...profile.posts];
        const sortedTimeline = unsortedTimeline.sort((a, b) => {
            const dateA = a.updatedAt || a.createdAt;
            const dateB = b.updatedAt || b.createdAt;
            return dateB.localeCompare(dateA);
        });
        console.log(sortedTimeline)
        setTimeline(sortedTimeline);
    }
    
    useEffect(() => {
        if(profile){
            console.log(profile)
            createTimeline(profile)
        }
    }, [profile])

    return (
        <div className="flex flex-col gap-2">
            {timeline && timeline.map(obj =>
            (obj.type == 'LIKE' || obj.type == 'SHARE') ?
                <Card className="p-2 bg-secondary/20 border-none">
                    {obj.type == 'LIKE' &&
                    <>
                    <CardDescription className="flex items-center gap-1 mx-6">
                        <Star size={"15px"} />
                        {profile.nickname || profile.username} liked a {obj.branchId ? 'branch' : 'post'}
                    </CardDescription>
                    <CardContent className="mt-2">
                        {obj.branchId && obj.branch ?
                        <>
                        <Link to={`/${obj.branch.projectId}/${obj.branch.id}/`}>
                            <TimelineBranchCard branch={obj.branch} />
                        </Link>
                        </>
                        : obj.postId && obj.post ?
                        <Link to={`/${obj.post.branch.projectId}/${obj.post.branch.id}/`}>
                            <TimelinePostCard post={obj.post} />
                        </Link>
                        : null}
                    </CardContent>
                    </>}
                    {obj.type == 'SHARE' &&
                    <>
                    <CardDescription className="flex items-center gap-1 mx-6">
                        <Forward size={"15px"} />
                        {profile.nickname || profile.username} shared a {obj.branchId ? 'branch' : 'post'}
                    </CardDescription>
                    <CardContent className="mt-2">
                        {obj.branchId && obj.branch ?
                            <TimelineBranchCard branch={obj.branch} />
                        : obj.postId && obj.post ?
                            <TimelinePostCard post={obj.post} />
                        : null}
                    </CardContent>
                    </>}
                </Card>
                :
                obj.content ?
                <Card className="p-2 bg-secondary/20 border-none">
                    <CardDescription className="flex items-center gap-1 mx-6">
                        <FaRegFileAlt size={"15px"} />
                        {profile.nickname || profile.username} posted
                    </CardDescription>
                    <CardContent className="mt-2">
                       <TimelinePostCard post={obj as Post} />
                    </CardContent>
                </Card>
                :
                obj.projectId ?
                <Card className="p-2 bg-secondary/20 border-none">
                    <CardDescription className="flex items-center gap-1 mx-6">
                        <AiOutlineBranches size={"15px"} />
                        {profile.nickname || profile.username} created a branch
                    </CardDescription>
                    <CardContent className="mt-2">
                       <TimelineBranchCard branch={obj as Branch} />
                    </CardContent>
                </Card>
                : 
                obj.name && !obj.projectId ?
                <Card className="p-2 bg-secondary/20 border-none">
                    <CardDescription className="flex items-center gap-1 mx-6">
                        <FiFolderPlus size={"15px"} />
                        {profile.nickname || profile.username} created a project
                    </CardDescription>
                    <CardContent className="mt-2">
                       <TimelineProjectCard project={obj as Project} />
                    </CardContent>
                </Card>
                : null
            )}
        </div>
    )
}