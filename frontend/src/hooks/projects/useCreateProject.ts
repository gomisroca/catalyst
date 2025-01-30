import { useMutation } from '@tanstack/react-query';
import { projectService } from '@/api/services/projectService';

export const useCreateProject = () => {
  return useMutation({
    mutationFn: (projectData: FormData) => {
      return projectService.createProject(projectData);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
    retry: 1, // Retry once on failure
  });
};
