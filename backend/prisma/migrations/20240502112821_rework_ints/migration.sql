/*
  Warnings:

  - You are about to drop the `_bookmarkBranch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_bookmarkPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_hiddenBranch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_hiddenPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_likeBranch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_likePost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_reportBranch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_reportPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_shareBranch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_sharePost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_bookmarkBranch" DROP CONSTRAINT "_bookmarkBranch_A_fkey";

-- DropForeignKey
ALTER TABLE "_bookmarkBranch" DROP CONSTRAINT "_bookmarkBranch_B_fkey";

-- DropForeignKey
ALTER TABLE "_bookmarkPost" DROP CONSTRAINT "_bookmarkPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_bookmarkPost" DROP CONSTRAINT "_bookmarkPost_B_fkey";

-- DropForeignKey
ALTER TABLE "_hiddenBranch" DROP CONSTRAINT "_hiddenBranch_A_fkey";

-- DropForeignKey
ALTER TABLE "_hiddenBranch" DROP CONSTRAINT "_hiddenBranch_B_fkey";

-- DropForeignKey
ALTER TABLE "_hiddenPost" DROP CONSTRAINT "_hiddenPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_hiddenPost" DROP CONSTRAINT "_hiddenPost_B_fkey";

-- DropForeignKey
ALTER TABLE "_likeBranch" DROP CONSTRAINT "_likeBranch_A_fkey";

-- DropForeignKey
ALTER TABLE "_likeBranch" DROP CONSTRAINT "_likeBranch_B_fkey";

-- DropForeignKey
ALTER TABLE "_likePost" DROP CONSTRAINT "_likePost_A_fkey";

-- DropForeignKey
ALTER TABLE "_likePost" DROP CONSTRAINT "_likePost_B_fkey";

-- DropForeignKey
ALTER TABLE "_reportBranch" DROP CONSTRAINT "_reportBranch_A_fkey";

-- DropForeignKey
ALTER TABLE "_reportBranch" DROP CONSTRAINT "_reportBranch_B_fkey";

-- DropForeignKey
ALTER TABLE "_reportPost" DROP CONSTRAINT "_reportPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_reportPost" DROP CONSTRAINT "_reportPost_B_fkey";

-- DropForeignKey
ALTER TABLE "_shareBranch" DROP CONSTRAINT "_shareBranch_A_fkey";

-- DropForeignKey
ALTER TABLE "_shareBranch" DROP CONSTRAINT "_shareBranch_B_fkey";

-- DropForeignKey
ALTER TABLE "_sharePost" DROP CONSTRAINT "_sharePost_A_fkey";

-- DropForeignKey
ALTER TABLE "_sharePost" DROP CONSTRAINT "_sharePost_B_fkey";

-- DropTable
DROP TABLE "_bookmarkBranch";

-- DropTable
DROP TABLE "_bookmarkPost";

-- DropTable
DROP TABLE "_hiddenBranch";

-- DropTable
DROP TABLE "_hiddenPost";

-- DropTable
DROP TABLE "_likeBranch";

-- DropTable
DROP TABLE "_likePost";

-- DropTable
DROP TABLE "_reportBranch";

-- DropTable
DROP TABLE "_reportPost";

-- DropTable
DROP TABLE "_shareBranch";

-- DropTable
DROP TABLE "_sharePost";

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "branchId" TEXT,
    "postId" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_branchId_key" ON "Like"("branchId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_postId_key" ON "Like"("postId");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
