ALTER TABLE "catalyst_branch_interaction" ADD CONSTRAINT "catalyst_branch_interaction_userId_branchId_type_pk" PRIMARY KEY("userId","branchId","type");--> statement-breakpoint
ALTER TABLE "catalyst_post_interaction" ADD CONSTRAINT "catalyst_post_interaction_userId_postId_type_pk" PRIMARY KEY("userId","postId","type");--> statement-breakpoint
ALTER TABLE "catalyst_project_interaction" ADD CONSTRAINT "catalyst_project_interaction_userId_projectId_type_pk" PRIMARY KEY("userId","projectId","type");--> statement-breakpoint
ALTER TABLE "catalyst_branch_interaction" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "catalyst_post_interaction" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "catalyst_project_interaction" DROP COLUMN IF EXISTS "id";