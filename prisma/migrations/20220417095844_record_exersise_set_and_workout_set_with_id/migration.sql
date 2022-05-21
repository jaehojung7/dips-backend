/*
  Warnings:

  - Made the column `recordId` on table `RecordExerciseSet` required. This step will fail if there are existing NULL values in that column.
  - Made the column `programId` on table `WorkoutSet` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "RecordExerciseSet" ALTER COLUMN "recordId" SET NOT NULL;

-- AlterTable
ALTER TABLE "WorkoutSet" ALTER COLUMN "programId" SET NOT NULL;
