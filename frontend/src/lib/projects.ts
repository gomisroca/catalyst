export async function getProjects(): Promise<Project[]> {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/projects/`);
    return res.json() as Promise<Project[]>;
}

export async function getProject(projectId: string): Promise<Project> {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/projects/${projectId}/`);
    return res.json() as Promise<Project>;
}

export async function getBranch(branchId: string): Promise<Branch> {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/projects/branch/${branchId}/`);
    return res.json() as Promise<Branch>;
}

export async function createProject(accessToken: string, projectData: FormData){
    const res = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/projects`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        body: projectData
    })
    return res
}

interface BranchData {
    name: string;
    description: string;
    parentBranch: string;
    projectId: string;
    permissions: string[];
}
export async function createBranch(accessToken: string, branchData: BranchData, projectId: string){
    console.log(projectId)
    const res = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/projects/${projectId}/branch`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(branchData)
    })
    return res
}

export async function createPost(accessToken: string, postData: FormData, branch: Branch){
    const res = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/projects/branch/${branch.id}/post`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        body: postData
    })
    return res
}

interface InteractionData{
    type: string;
}
export async function updateInteractions(accessToken: string, postId: string, data: InteractionData){
    const res = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/projects/post/${postId}/interactions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(data)
    })
    return res
}

export async function removeInteractions(accessToken: string, postId: string, data: InteractionData){
    const res = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/projects/post/${postId}/interactions`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(data)
    })
    return res
}