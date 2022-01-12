/*
  Warnings:

  - You are about to drop the column `maxReps` on the `TemplateSet` table. All the data in the column will be lost.
  - You are about to drop the column `minReps` on the `TemplateSet` table. All the data in the column will be lost.
  - You are about to drop the column `rir` on the `TemplateSet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TemplateSet" DROP COLUMN "maxReps",
DROP COLUMN "minReps",
DROP COLUMN "rir";
