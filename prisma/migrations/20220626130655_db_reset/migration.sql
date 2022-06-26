/*
  Warnings:

  - Made the column `description` on table `Program` required. This step will fail if there are existing NULL values in that column.
  - Made the column `repCount` on table `WorkoutSet` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Program" ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "WorkoutSet" ALTER COLUMN "repCount" SET NOT NULL;
