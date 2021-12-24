/*
  Warnings:

  - You are about to drop the column `public` on the `Program` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Program" DROP COLUMN "public",
ADD COLUMN     "private" BOOLEAN NOT NULL DEFAULT false;
