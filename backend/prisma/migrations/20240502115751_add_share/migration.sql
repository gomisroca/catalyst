-- CreateTable
CREATE TABLE "Share" (
    "id" TEXT NOT NULL,
    "branchId" TEXT,
    "postId" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Share_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Share_branchId_key" ON "Share"("branchId");

-- CreateIndex
CREATE UNIQUE INDEX "Share_postId_key" ON "Share"("postId");

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
