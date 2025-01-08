import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '@/api/services/projectService';

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, projectData }: { id: string; projectData: FormData }) => {
      return projectService.updateProject(id, projectData);
    },
    onSuccess: (projectData) => {
      queryClient.invalidateQueries({ queryKey: ['projects', projectData.id] });
    },
    retry: 1, // Retry once on failure
  });
};
