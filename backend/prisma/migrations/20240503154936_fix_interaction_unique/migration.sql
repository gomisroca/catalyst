/*
  Warnings:

  - A unique constraint covering the columns `[userId,postId,branchId,type]` on the table `Interaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Interaction_userId_postId_branchId_type_key" ON "Interaction"("userId", "postId", "branchId", "type");
