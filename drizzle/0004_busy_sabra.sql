ALTER TABLE "catalyst_session" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "catalyst_post" DROP CONSTRAINT "catalyst_post_created_by_catalyst_user_id_fk";
--> statement-breakpoint
ALTER TABLE "catalyst_session" DROP CONSTRAINT "catalyst_session_user_id_catalyst_user_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "session_user_id_idx";--> statement-breakpoint
ALTER TABLE "catalyst_session" ALTER COLUMN "userId" SET DATA TYPE uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "catalyst_session" ADD CONSTRAINT "catalyst_session_userId_catalyst_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."catalyst_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_id_idx" ON "catalyst_session" USING btree ("userId");--> statement-breakpoint
ALTER TABLE "catalyst_post" DROP COLUMN IF EXISTS "created_by";