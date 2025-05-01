/*
  Warnings:

  - The `allowedUsers` column on the `BranchPermissions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `allowedUsers` column on the `ProjectPermissions` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "BranchPermissions" DROP COLUMN "allowedUsers",
ADD COLUMN     "allowedUsers" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "ProjectPermissions" DROP COLUMN "allowedUsers",
ADD COLUMN     "allowedUsers" TEXT[] DEFAULT ARRAY[]::TEXT[];
