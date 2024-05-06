import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function popularityPerBranch(branches) {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

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
}

function activityPerBranch(branches) {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return branches.map(branch => {
        const postsLastWeek = branch.posts.filter(post => new Date(post.createdAt) > oneWeekAgo);
        const childrenLastWeek = branch.childBranches.filter(child => new Date(child.createdAt) > oneWeekAgo);
        const activityLastWeek = postsLastWeek.length + childrenLastWeek.length;
        return { branchId: branch.id, activityLastWeek: activityLastWeek };
    });
}

function getTrending(data, type){
    if (type == 'activity'){
        const sortedData = data.map(item => item.activity).sort((a, b) => a - b);
        const median = sortedData[Math.floor(sortedData.length / 2)];
        
        return data.filter(item => item.activity >= median);
    } else if (type == 'popularity'){
        const sortedData = data.map(item => item.popularity).sort((a, b) => a - b);
        const median = sortedData[Math.floor(sortedData.length / 2)];
        return data.filter(item => item.popularity >= median);
    }
}

export async function setMetrics(projects){
    let branchesActivity = [];
    let branchesPopularity = [];
    let projectActivity = [];
    let projectPopularity = [];
    for(const project of projects){
        const activity = activityPerBranch(project.branches)
        const popularity = popularityPerBranch(project.branches)

        for(const branchActivity of activity){
            branchesActivity.push({branchId: branchActivity.branchId, activity: branchActivity.activityLastWeek})
            await prisma.branch.update({
                where: { 
                    id: branchActivity.branchId
                },
                data: {
                    activity: branchActivity.activityLastWeek,
                }
            })
        }
        for(const branchPopularity of popularity){
            branchesPopularity.push({branchId: branchPopularity.branchId, popularity: branchPopularity.interactionsLastWeek})
            await prisma.branch.update({
                where: { 
                    id: branchPopularity.branchId
                },
                data: {
                    popularity: branchPopularity.interactionsLastWeek,
                }
            })
        }

        const totalActivity = activity.reduce((total, branch) => {
            return total + branch.activityLastWeek;
        }, 0);
        projectActivity.push({projectId: project.id, activity: totalActivity})
        const totalPopularity = popularity.reduce((total, branch) => {
            return total + branch.interactionsLastWeek;
        }, 0);
        projectPopularity.push({projectId: project.id, popularity: totalPopularity})

        await prisma.project.update({
            where: { 
                id: project.id
            },
            data: {
                activity: totalActivity,
                popularity: totalPopularity
            }
        })
    }
    await prisma.project.updateMany({
        data: {
            trendingActivity: false,
            trendingPopularity: false,
        }
    })
    await prisma.branch.updateMany({
        data: {
            trendingActivity: false,
            trendingPopularity: false,
        }
    })
    const mostActiveBranches = getTrending(branchesActivity, 'activity');
    for(const branch of mostActiveBranches){
        await prisma.branch.update({
            where: {
                id: branch.branchId
            },
            data: { 
                trendingActivity: true,
            }
        })
    }
    const mostPopularBranches = getTrending(branchesPopularity, 'popularity');
    console.log(mostPopularBranches)
    for(const branch of mostPopularBranches){
        await prisma.branch.update({
            where: {
                id: branch.branchId
            },
            data: { 
                trendingPopularity: true,
            }
        })
    }
    const mostActiveProjects = getTrending(projectActivity, 'activity');
    for(const project of mostActiveProjects){
        await prisma.project.update({
            where: {
                id: project.projectId
            },
            data: { 
                trendingActivity: true,
            }
        })
    }
    const mostPopularProjects = getTrending(projectPopularity, 'popularity');
    for(const project of mostPopularProjects){
        await prisma.project.update({
            where: {
                id: project.projectId
            },
            data: { 
                trendingPopularity: true,
            }
        })
    }
}