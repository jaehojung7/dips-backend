/*
  Warnings:

  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Exercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hashtag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Program` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Set` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Template` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_HashtagToProgram` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_HashtagToTemplate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_templateId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_programId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- DropForeignKey
ALTER TABLE "Program" DROP CONSTRAINT "Program_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "Template" DROP CONSTRAINT "Template_programId_fkey";

-- DropForeignKey
ALTER TABLE "_HashtagToProgram" DROP CONSTRAINT "_HashtagToProgram_A_fkey";

-- DropForeignKey
ALTER TABLE "_HashtagToProgram" DROP CONSTRAINT "_HashtagToProgram_B_fkey";

-- DropForeignKey
ALTER TABLE "_HashtagToTemplate" DROP CONSTRAINT "_HashtagToTemplate_A_fkey";

-- DropForeignKey
ALTER TABLE "_HashtagToTemplate" DROP CONSTRAINT "_HashtagToTemplate_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar";

-- DropTable
DROP TABLE "Exercise";

-- DropTable
DROP TABLE "Hashtag";

-- DropTable
DROP TABLE "Like";

-- DropTable
DROP TABLE "Program";

-- DropTable
DROP TABLE "Set";

-- DropTable
DROP TABLE "Template";

-- DropTable
DROP TABLE "_HashtagToProgram";

-- DropTable
DROP TABLE "_HashtagToTemplate";
