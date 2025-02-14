ALTER TABLE "catalyst_post" ADD COLUMN "content" text;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "branch_created_at_idx" ON "catalyst_branch" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "branch_updated_at_idx" ON "catalyst_branch" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "branch_author_idx" ON "catalyst_branch" USING btree ("authorId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "branch_project_idx" ON "catalyst_branch" USING btree ("projectId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "branch_author_time_idx" ON "catalyst_branch" USING btree ("authorId","created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "branch_search_idx" ON "catalyst_branch" USING gin ((
        setweight(to_tsvector('english', "name"), 'A') ||
        setweight(to_tsvector('english', "description"), 'B')
      ));--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "branch_interaction_user_idx" ON "catalyst_branch_interaction" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "branch_interaction_branch_idx" ON "catalyst_branch_interaction" USING btree ("branchId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "branch_permissions_branch_idx" ON "catalyst_branch_permissions" USING btree ("branchId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "follower_idx" ON "catalyst_follow" USING btree ("follower_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "followed_idx" ON "catalyst_follow" USING btree ("followed_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_created_at_idx" ON "catalyst_post" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_author_idx" ON "catalyst_post" USING btree ("authorId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_author_time_idx" ON "catalyst_post" USING btree ("authorId","created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_search_idx" ON "catalyst_post" USING gin ((
        setweight(to_tsvector('english', "name"), 'A') ||
        setweight(to_tsvector('english', "content"), 'B')
      ));--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_interaction_user_idx" ON "catalyst_post_interaction" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_interaction_post_idx" ON "catalyst_post_interaction" USING btree ("postId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "project_created_at_idx" ON "catalyst_project" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "project_updated_at_idx" ON "catalyst_project" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "project_author_idx" ON "catalyst_project" USING btree ("authorId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "project_author_time_idx" ON "catalyst_project" USING btree ("authorId","created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "project_search_idx" ON "catalyst_project" USING gin ((
      setweight(to_tsvector('english', "name"), 'A') ||
      setweight(to_tsvector('english', "description"), 'B')
    ));--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "project_interaction_user_idx" ON "catalyst_project_interaction" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "project_interaction_project_idx" ON "catalyst_project_interaction" USING btree ("projectId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "project_permissions_project_idx" ON "catalyst_project_permissions" USING btree ("projectId");