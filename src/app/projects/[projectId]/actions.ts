'use server';

export async function goToBranch(formData: FormData) {
  const projectId = formData.get('projectId');
  const branchId = formData.get('branchId');
  return {
    message: 'Redirecting...',
    redirect: `/projects/${projectId as string}/${branchId as string}`,
  };
}
