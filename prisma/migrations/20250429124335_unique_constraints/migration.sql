/*
  Warnings:

  - A unique constraint covering the columns `[branchId,userId,type]` on the table `BranchInteraction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[postId,userId,type]` on the table `PostInteraction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectId,userId,type]` on the table `ProjectInteraction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BranchInteraction_branchId_userId_type_key" ON "BranchInteraction"("branchId", "userId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "PostInteraction_postId_userId_type_key" ON "PostInteraction"("postId", "userId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectInteraction_projectId_userId_type_key" ON "ProjectInteraction"("projectId", "userId", "type");
