/*
  Warnings:

  - You are about to drop the column `recReps` on the `TemplateSet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TemplateSet" DROP COLUMN "recReps",
ADD COLUMN     "maxReps" INTEGER,
ADD COLUMN     "minReps" INTEGER;
