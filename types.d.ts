import { type branchesInteractions } from '@/server/db/schema';

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
