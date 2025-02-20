'use server';

import { redirect } from 'next/navigation';

export async function goToBranch(formData: FormData) {
  const projectId = formData.get('projectId');
  const branchId = formData.get('branchId');
  if (branchId && projectId) {
    redirect(`/projects/${projectId as string}/${branchId as string}`);
  }
  return;
}
