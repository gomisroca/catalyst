/*
  Warnings:

  - You are about to drop the `Interactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Interactions" DROP CONSTRAINT "Interactions_branchId_fkey";

-- DropForeignKey
ALTER TABLE "Interactions" DROP CONSTRAINT "Interactions_postId_fkey";

-- DropTable
DROP TABLE "Interactions";

-- CreateTable
CREATE TABLE "_likePost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_sharePost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_bookmarkPost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_reportPost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_hiddenPost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_likeBranch" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_shareBranch" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_bookmarkBranch" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_reportBranch" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_hiddenBranch" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_likePost_AB_unique" ON "_likePost"("A", "B");

-- CreateIndex
CREATE INDEX "_likePost_B_index" ON "_likePost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_sharePost_AB_unique" ON "_sharePost"("A", "B");

-- CreateIndex
CREATE INDEX "_sharePost_B_index" ON "_sharePost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_bookmarkPost_AB_unique" ON "_bookmarkPost"("A", "B");

-- CreateIndex
CREATE INDEX "_bookmarkPost_B_index" ON "_bookmarkPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_reportPost_AB_unique" ON "_reportPost"("A", "B");

-- CreateIndex
CREATE INDEX "_reportPost_B_index" ON "_reportPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_hiddenPost_AB_unique" ON "_hiddenPost"("A", "B");

-- CreateIndex
CREATE INDEX "_hiddenPost_B_index" ON "_hiddenPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_likeBranch_AB_unique" ON "_likeBranch"("A", "B");

-- CreateIndex
CREATE INDEX "_likeBranch_B_index" ON "_likeBranch"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_shareBranch_AB_unique" ON "_shareBranch"("A", "B");

-- CreateIndex
CREATE INDEX "_shareBranch_B_index" ON "_shareBranch"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_bookmarkBranch_AB_unique" ON "_bookmarkBranch"("A", "B");

-- CreateIndex
CREATE INDEX "_bookmarkBranch_B_index" ON "_bookmarkBranch"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_reportBranch_AB_unique" ON "_reportBranch"("A", "B");

-- CreateIndex
CREATE INDEX "_reportBranch_B_index" ON "_reportBranch"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_hiddenBranch_AB_unique" ON "_hiddenBranch"("A", "B");

-- CreateIndex
CREATE INDEX "_hiddenBranch_B_index" ON "_hiddenBranch"("B");

-- AddForeignKey
ALTER TABLE "_likePost" ADD CONSTRAINT "_likePost_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likePost" ADD CONSTRAINT "_likePost_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_sharePost" ADD CONSTRAINT "_sharePost_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_sharePost" ADD CONSTRAINT "_sharePost_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_bookmarkPost" ADD CONSTRAINT "_bookmarkPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_bookmarkPost" ADD CONSTRAINT "_bookmarkPost_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_reportPost" ADD CONSTRAINT "_reportPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_reportPost" ADD CONSTRAINT "_reportPost_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_hiddenPost" ADD CONSTRAINT "_hiddenPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_hiddenPost" ADD CONSTRAINT "_hiddenPost_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likeBranch" ADD CONSTRAINT "_likeBranch_A_fkey" FOREIGN KEY ("A") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likeBranch" ADD CONSTRAINT "_likeBranch_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_shareBranch" ADD CONSTRAINT "_shareBranch_A_fkey" FOREIGN KEY ("A") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_shareBranch" ADD CONSTRAINT "_shareBranch_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_bookmarkBranch" ADD CONSTRAINT "_bookmarkBranch_A_fkey" FOREIGN KEY ("A") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_bookmarkBranch" ADD CONSTRAINT "_bookmarkBranch_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_reportBranch" ADD CONSTRAINT "_reportBranch_A_fkey" FOREIGN KEY ("A") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_reportBranch" ADD CONSTRAINT "_reportBranch_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_hiddenBranch" ADD CONSTRAINT "_hiddenBranch_A_fkey" FOREIGN KEY ("A") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_hiddenBranch" ADD CONSTRAINT "_hiddenBranch_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
