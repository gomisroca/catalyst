/*
  Warnings:

  - The primary key for the `BranchInteraction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PostInteraction` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "BranchInteraction" DROP CONSTRAINT "BranchInteraction_pkey",
ADD CONSTRAINT "BranchInteraction_pkey" PRIMARY KEY ("userId", "branchId", "type");

-- AlterTable
ALTER TABLE "PostInteraction" DROP CONSTRAINT "PostInteraction_pkey",
ADD CONSTRAINT "PostInteraction_pkey" PRIMARY KEY ("userId", "postId", "type");
