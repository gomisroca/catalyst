import { Branch, Post, Project } from "@prisma/client";

interface BranchWithPosts extends Branch{
    posts: Post[]
}
interface ProjectWithBranches extends Project{
    branches: BranchWithPosts[]
}
export function checkPopularity(projects: ProjectWithBranches[]) {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const countInteractionPerBranch = (branches) => {
        return branches.map(branch => {
            const branchPostInteractions = branch.posts.reduce((postTotal, post) => {
                const postInteractionsLastWeek = post.interactions.filter(interaction => new Date(interaction.createdAt) > oneWeekAgo);
                const positiveInteractions = postInteractionsLastWeek.filter(interaction => interaction.type !== 'REPORT' && interaction.type !== 'HIDE');
                const negativeInteractions = postInteractionsLastWeek.filter(interaction => interaction.type == 'REPORT' || interaction.type == 'HIDE');
                const interactionsLastWeek = positiveInteractions.length - negativeInteractions.length;
                return postTotal + interactionsLastWeek;
            }, 0);
            
            const branchInteractions = branch.interactions.filter(interaction => new Date(interaction.createdAt) > oneWeekAgo);
            const positiveInteractions = branchInteractions.filter(interaction => interaction.type !== 'REPORT' && interaction.type !== 'HIDE');
            const negativeInteractions = branchInteractions.filter(interaction => interaction.type == 'REPORT' || interaction.type == 'HIDE');
            const interactionsLastWeek = positiveInteractions.length - negativeInteractions.length;

            const branchInteractionsLastWeek = branchPostInteractions + interactionsLastWeek;

          return { branchId: branch.id, interactionsLastWeek: branchInteractionsLastWeek };
        });
    };

    for(const project of projects){
        console.log('Project ID: ' + project.id)

        // Interactions by Branch
        const interactionsPerBranch = countInteractionPerBranch(project.branches || []);
        console.log(interactionsPerBranch)
        const totalInteractions = interactionsPerBranch.reduce((total, branch) => {
            return total + branch.interactionsLastWeek;
        }, 0);
        console.log('Total: ' + totalInteractions)
    }
}

export function checkActivity(projects: ProjectWithBranches[]) {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const countActivityPerBranch = (branches) => {
        return branches.map(branch => {
            const postsLastWeek = branch.posts.filter(post => new Date(post.createdAt) > oneWeekAgo);
            const childrenLastWeek = branch.childBranches.filter(child => new Date(child.createdAt) > oneWeekAgo);
            const activityLastWeek = postsLastWeek.length + childrenLastWeek.length;
            return { branchId: branch.id, activityLastWeek: activityLastWeek };
        });
    };

    for(const project of projects){
        console.log('Project ID: ' + project.id)

        // Activity by Branch
        const activityPerBranch = countActivityPerBranch(project.branches || []);
        console.log(activityPerBranch)
        const totalActivity = activityPerBranch.reduce((total, branch) => {
            return total + branch.activityLastWeek;
        }, 0);
        console.log('Total: ' + totalActivity)
    }
}