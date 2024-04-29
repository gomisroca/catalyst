-- AlterTable
ALTER TABLE "User" ADD COLUMN     "facebookId" TEXT;

-- CreateTable
CREATE TABLE "Facebook" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT,

    CONSTRAINT "Facebook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Facebook_userId_key" ON "Facebook"("userId");

-- AddForeignKey
ALTER TABLE "Facebook" ADD CONSTRAINT "Facebook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
