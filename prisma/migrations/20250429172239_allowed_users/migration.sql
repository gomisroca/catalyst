/*
  Warnings:

  - You are about to drop the column `allowedUsers` on the `BranchPermissions` table. All the data in the column will be lost.
  - You are about to drop the column `allowedUsers` on the `ProjectPermissions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BranchPermissions" DROP COLUMN "allowedUsers";

-- AlterTable
ALTER TABLE "ProjectPermissions" DROP COLUMN "allowedUsers";

-- CreateTable
CREATE TABLE "_BranchPermissionsToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BranchPermissionsToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ProjectPermissionsToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProjectPermissionsToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BranchPermissionsToUser_B_index" ON "_BranchPermissionsToUser"("B");

-- CreateIndex
CREATE INDEX "_ProjectPermissionsToUser_B_index" ON "_ProjectPermissionsToUser"("B");

-- AddForeignKey
ALTER TABLE "_BranchPermissionsToUser" ADD CONSTRAINT "_BranchPermissionsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "BranchPermissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BranchPermissionsToUser" ADD CONSTRAINT "_BranchPermissionsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectPermissionsToUser" ADD CONSTRAINT "_ProjectPermissionsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ProjectPermissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectPermissionsToUser" ADD CONSTRAINT "_ProjectPermissionsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
