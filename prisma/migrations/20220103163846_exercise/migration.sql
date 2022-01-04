/*
  Warnings:

  - You are about to drop the column `exercises` on the `TemplateSet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TemplateSet" DROP COLUMN "exercises",
ADD COLUMN     "exercise" TEXT[];
