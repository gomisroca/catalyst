/*
  Warnings:

  - Added the required column `refreshToken` to the `Google` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Google" ADD COLUMN     "refreshToken" TEXT NOT NULL;
