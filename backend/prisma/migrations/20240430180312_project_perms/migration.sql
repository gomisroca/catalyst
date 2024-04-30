/*
  Warnings:

  - A unique constraint covering the columns `[projectId]` on the table `Permissions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Permissions" DROP CONSTRAINT "Permissions_branchId_fkey";

-- AlterTable
ALTER TABLE "Permissions" ADD COLUMN     "projectId" TEXT,
ALTER COLUMN "branchId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Permissions_projectId_key" ON "Permissions"("projectId");

-- AddForeignKey
ALTER TABLE "Permissions" ADD CONSTRAINT "Permissions_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permissions" ADD CONSTRAINT "Permissions_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
