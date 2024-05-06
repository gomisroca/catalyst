-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "trendingActivity" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "trendingPopularity" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "trendingActivity" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "trendingPopularity" BOOLEAN NOT NULL DEFAULT false;
