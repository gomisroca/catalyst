/*
  Warnings:

  - Added the required column `name` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "name" TEXT NOT NULL;
