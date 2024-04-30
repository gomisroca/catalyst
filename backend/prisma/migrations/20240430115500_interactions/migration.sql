-- DropForeignKey
ALTER TABLE "Interactions" DROP CONSTRAINT "Interactions_branchId_fkey";

-- DropForeignKey
ALTER TABLE "Interactions" DROP CONSTRAINT "Interactions_postId_fkey";

-- AlterTable
ALTER TABLE "Interactions" ALTER COLUMN "postId" DROP NOT NULL,
ALTER COLUMN "branchId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Interactions" ADD CONSTRAINT "Interactions_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interactions" ADD CONSTRAINT "Interactions_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
