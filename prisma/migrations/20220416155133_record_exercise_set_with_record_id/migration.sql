/*
  Warnings:

  - Added the required column `recordId` to the `RecordExerciseSet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecordExerciseSet" ADD COLUMN     "recordId" INTEGER NOT NULL;
