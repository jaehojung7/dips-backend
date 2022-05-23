/*
  Warnings:

  - You are about to drop the `_ExerciseToUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[exercise,userId]` on the table `Exercise` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ExerciseToUser" DROP CONSTRAINT "_ExerciseToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToUser" DROP CONSTRAINT "_ExerciseToUser_B_fkey";

-- DropIndex
DROP INDEX "Exercise_exercise_key";

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ExerciseToUser";

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_exercise_userId_key" ON "Exercise"("exercise", "userId");

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
