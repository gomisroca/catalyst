/*
  Warnings:

  - You are about to drop the column `allowUsers` on the `Permissions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Permissions" DROP COLUMN "allowUsers",
ADD COLUMN     "allowedUsers" TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "follows" TEXT[];
