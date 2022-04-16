/*
  Warnings:

  - Added the required column `programId` to the `WorkoutSet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkoutSet" ADD COLUMN     "programId" INTEGER NOT NULL;
