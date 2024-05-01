export async function getProjects(): Promise<Project[]> {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/projects/`);
    return res.json() as Promise<Project[]>;
}

export async function getProject(projectId: string): Promise<Project> {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/projects/${projectId}`);
    return res.json() as Promise<Project>;
}

export async function getBranch(projectId: string, branchId: string): Promise<Branch> {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/projects/${projectId}/branch/${branchId}`);
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