import { useMutation } from '@tanstack/react-query';
import { projectService } from '@/api/services/projectService';

export const useCreateProject = () => {
  return useMutation({
    mutationFn: (projectData: FormData) => {
      return projectService.createProject(projectData);
    },
    retry: 1, // Retry once on failure
  });
};
