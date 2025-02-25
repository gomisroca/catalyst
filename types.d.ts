import { type projectsInteractions, type branchesInteractions, type postsInteractions } from '@/server/db/schema';

interface Provider {
  name: string;
  icon: React.ReactNode;
}

type BranchInteractionWithUser = {
  interaction: typeof branchesInteractions.$inferSelect;
  user: {
    name: string | null;
    email: string;
  };
};

type ProjectInteractionWithUser = {
  interaction: typeof projectsInteractions.$inferSelect;
  user: {
    name: string | null;
    email: string;
  };
};

type PostInteractionWithUser = {
  interaction: typeof postsInteractions.$inferSelect;
  user: {
    name: string | null;
    email: string;
  };
};
