DO $$ BEGIN
 CREATE TYPE "public"."interaction_type" AS ENUM('LIKE', 'SHARE', 'BOOKMARK', 'REPORT', 'HIDE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "catalyst_branch" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"description" varchar(512),
	"default" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	"projectId" uuid,
	"authorId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "catalyst_branch_interaction" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "interaction_type" NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"branchId" uuid,
	"userId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "catalyst_branch_permissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"private" boolean DEFAULT false,
	"allowedUsers" varchar[] DEFAULT '{}'::text[] NOT NULL,
	"allowCollaborate" boolean DEFAULT true,
	"allowBranch" boolean DEFAULT true,
	"allowShare" boolean DEFAULT true,
	"branchId" uuid NOT NULL,
	CONSTRAINT "catalyst_branch_permissions_branchId_unique" UNIQUE("branchId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "catalyst_follow" (
	"follower_id" uuid NOT NULL,
	"followed_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "catalyst_follow_follower_id_followed_id_pk" PRIMARY KEY("follower_id","followed_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "catalyst_post_interaction" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "interaction_type" NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"postId" uuid,
	"userId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "catalyst_post_media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(512),
	"postId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "catalyst_project" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"picture" varchar(512),
	"name" varchar(256) NOT NULL,
	"description" varchar(512),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	"authorId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "catalyst_project_interaction" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "interaction_type" NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"projectId" uuid,
	"userId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "catalyst_project_permissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"private" boolean DEFAULT false,
	"allowedUsers" varchar[] DEFAULT '{}'::text[] NOT NULL,
	"allowCollaborate" boolean DEFAULT true,
	"allowShare" boolean DEFAULT true,
	"projectId" uuid NOT NULL,
	CONSTRAINT "catalyst_project_permissions_projectId_unique" UNIQUE("projectId")
);
--> statement-breakpoint
DROP TABLE "catalyst_followers";--> statement-breakpoint
DROP INDEX IF EXISTS "created_by_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "name_idx";--> statement-breakpoint
ALTER TABLE "catalyst_account" ALTER COLUMN "user_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "catalyst_post" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "catalyst_post" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "catalyst_post" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "catalyst_user" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "catalyst_user" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "catalyst_post" ADD COLUMN "branchId" uuid;--> statement-breakpoint
ALTER TABLE "catalyst_post" ADD COLUMN "authorId" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "catalyst_branch" ADD CONSTRAINT "catalyst_branch_projectId_catalyst_project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."catalyst_project"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "catalyst_branch" ADD CONSTRAINT "catalyst_branch_authorId_catalyst_user_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."catalyst_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "catalyst_branch_interaction" ADD CONSTRAINT "catalyst_branch_interaction_branchId_catalyst_branch_id_fk" FOREIGN KEY ("branchId") REFERENCES "public"."catalyst_branch"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "catalyst_branch_interaction" ADD CONSTRAINT "catalyst_branch_interaction_userId_catalyst_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."catalyst_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "catalyst_branch_permissions" ADD CONSTRAINT "catalyst_branch_permissions_branchId_catalyst_branch_id_fk" FOREIGN KEY ("branchId") REFERENCES "public"."catalyst_branch"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "catalyst_follow" ADD CONSTRAINT "catalyst_follow_follower_id_catalyst_user_id_fk" FOREIGN KEY ("follower_id") REFERENCES "public"."catalyst_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "catalyst_follow" ADD CONSTRAINT "catalyst_follow_followed_id_catalyst_user_id_fk" FOREIGN KEY ("followed_id") REFERENCES "public"."catalyst_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "catalyst_post_interaction" ADD CONSTRAINT "catalyst_post_interaction_postId_catalyst_post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."catalyst_post"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "catalyst_post_interaction" ADD CONSTRAINT "catalyst_post_interaction_userId_catalyst_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."catalyst_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "catalyst_post_media" ADD CONSTRAINT "catalyst_post_media_postId_catalyst_post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."catalyst_post"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "catalyst_project" ADD CONSTRAINT "catalyst_project_authorId_catalyst_user_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."catalyst_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "catalyst_project_interaction" ADD CONSTRAINT "catalyst_project_interaction_projectId_catalyst_project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."catalyst_project"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "catalyst_project_interaction" ADD CONSTRAINT "catalyst_project_interaction_userId_catalyst_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."catalyst_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "catalyst_project_permissions" ADD CONSTRAINT "catalyst_project_permissions_projectId_catalyst_project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."catalyst_project"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "catalyst_post" ADD CONSTRAINT "catalyst_post_branchId_catalyst_branch_id_fk" FOREIGN KEY ("branchId") REFERENCES "public"."catalyst_branch"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "catalyst_post" ADD CONSTRAINT "catalyst_post_authorId_catalyst_user_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."catalyst_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
