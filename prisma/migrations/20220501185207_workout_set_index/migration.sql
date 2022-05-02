/*
  Warnings:

  - Added the required column `recordExerciseSetIndex` to the `RecordExerciseSet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workoutSetIndex` to the `WorkoutSet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecordExerciseSet" ADD COLUMN     "recordExerciseSetIndex" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "WorkoutSet" ADD COLUMN     "workoutSetIndex" INTEGER NOT NULL;
