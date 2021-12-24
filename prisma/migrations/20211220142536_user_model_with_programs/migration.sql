/*
  Warnings:

  - You are about to drop the column `authorId` on the `Program` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Program` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Program" DROP CONSTRAINT "Program_authorId_fkey";

-- AlterTable
ALTER TABLE "Program" DROP COLUMN "authorId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
