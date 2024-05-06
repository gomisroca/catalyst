export function popularityPerBranch(branches) {
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

export function activityPerBranch(branches) {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return branches.map(branch => {
        const postsLastWeek = branch.posts.filter(post => new Date(post.createdAt) > oneWeekAgo);
        const childrenLastWeek = branch.childBranches.filter(child => new Date(child.createdAt) > oneWeekAgo);
        const activityLastWeek = postsLastWeek.length + childrenLastWeek.length;
        return { branchId: branch.id, activityLastWeek: activityLastWeek };
    });
}

export function getTrending(data, type){
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