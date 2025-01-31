import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '@/api/services/projectService';

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      return projectService.deleteProject(id);
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['projects', id] });
    },
    retry: 1, // Retry once on failure
  });
};
