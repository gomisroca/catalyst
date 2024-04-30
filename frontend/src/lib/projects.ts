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