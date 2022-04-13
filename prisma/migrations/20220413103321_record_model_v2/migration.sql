/*
  Warnings:

  - You are about to drop the column `title` on the `RecordExercise` table. All the data in the column will be lost.
  - You are about to drop the column `exercise` on the `RecordExerciseSet` table. All the data in the column will be lost.
  - You are about to drop the column `setCount` on the `RecordExerciseSet` table. All the data in the column will be lost.
  - Added the required column `exercise` to the `RecordExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `RecordExerciseSet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecordExercise" DROP COLUMN "title",
ADD COLUMN     "exercise" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RecordExerciseSet" DROP COLUMN "exercise",
DROP COLUMN "setCount",
ADD COLUMN     "weight" INTEGER NOT NULL;
