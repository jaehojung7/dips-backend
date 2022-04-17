/*
  Warnings:

  - Made the column `recordId` on table `RecordExerciseSet` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "RecordExerciseSet" ALTER COLUMN "recordId" SET NOT NULL;
