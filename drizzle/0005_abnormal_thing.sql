ALTER TABLE "catalyst_post" RENAME COLUMN "name" TO "title";--> statement-breakpoint
DROP INDEX IF EXISTS "post_search_idx";--> statement-breakpoint
ALTER TABLE "catalyst_branch_interaction" DROP CONSTRAINT "catalyst_branch_interaction_userId_branchId_type_pk";--> statement-breakpoint
ALTER TABLE "catalyst_follow" DROP CONSTRAINT "catalyst_follow_follower_id_followed_id_pk";--> statement-breakpoint
ALTER TABLE "catalyst_post_interaction" DROP CONSTRAINT "catalyst_post_interaction_userId_postId_type_pk";--> statement-breakpoint
ALTER TABLE "catalyst_project_interaction" DROP CONSTRAINT "catalyst_project_interaction_userId_projectId_type_pk";--> statement-breakpoint
ALTER TABLE "catalyst_post_media" ALTER COLUMN "name" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "catalyst_branch_interaction" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "catalyst_follow" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "catalyst_post_interaction" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "catalyst_post_media" ADD COLUMN "url" varchar(512);--> statement-breakpoint
ALTER TABLE "catalyst_project_interaction" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_search_idx" ON "catalyst_post" USING gin ((
        setweight(to_tsvector('english', "title"), 'A') ||
        setweight(to_tsvector('english', "content"), 'B')
      ));