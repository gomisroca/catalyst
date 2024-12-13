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

export async function createProject(accessToken: string, projectData: FormData) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/projects`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: projectData,
  });
  return res;
}

export async function updateProject(accessToken: string, projectData: FormData, projectId: string) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/projects/${projectId}/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: projectData,
  });
  return res;
}
interface BranchData {
  name: string;
  description: string;
  parentBranch: string;
  projectId: string;
  permissions: string[];
}
export async function createBranch(accessToken: string, branchData: BranchData, projectId: string) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/projects/${projectId}/branch`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(branchData),
  });
  return res;
}
interface EditBranchData {
  name: string;
  description: string;
  permissions: string[];
}
export async function updateBranch(accessToken: string, branchData: EditBranchData, branchId: string) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/projects/branch/${branchId}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(branchData),
  });
  return res;
}

export async function createPost(accessToken: string, postData: FormData, branch: Branch) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/projects/branch/${branch.id}/post`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: postData,
  });
  return res;
}

export async function updatePost(accessToken: string, postData: FormData, postId: string) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/projects/post/${postId}/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: postData,
  });
  return res;
}
interface InteractionData {
  type: string;
}
export async function updatePostInteractions(accessToken: string, postId: string, data: InteractionData) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/projects/post/${postId}/interactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return res;
}

export async function removePostInteractions(accessToken: string, postId: string, data: InteractionData) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/projects/post/${postId}/interactions`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return res;
}

export async function updateBranchInteractions(accessToken: string, branchId: string, data: InteractionData) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/projects/branch/${branchId}/interactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return res;
}

export async function removeBranchInteractions(accessToken: string, branchId: string, data: InteractionData) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/projects/branch/${branchId}/interactions`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return res;
}
