/*
  Warnings:

  - You are about to drop the column `private` on the `Program` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Program" DROP COLUMN "private",
ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT false;
