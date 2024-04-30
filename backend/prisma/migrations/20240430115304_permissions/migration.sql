/*
  Warnings:

  - You are about to drop the column `allowPrivate` on the `Permissions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Permissions" DROP COLUMN "allowPrivate",
ADD COLUMN     "private" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "allowCollaborate" SET DEFAULT true,
ALTER COLUMN "allowBranch" SET DEFAULT true,
ALTER COLUMN "allowShare" SET DEFAULT true;
