/*
  Warnings:

  - You are about to drop the `_HashtagToProgram` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_HashtagToProgram" DROP CONSTRAINT "_HashtagToProgram_A_fkey";

-- DropForeignKey
ALTER TABLE "_HashtagToProgram" DROP CONSTRAINT "_HashtagToProgram_B_fkey";

-- DropTable
DROP TABLE "_HashtagToProgram";

-- CreateTable
CREATE TABLE "ProgramHashtags" (
    "id" SERIAL NOT NULL,
    "programId" INTEGER,
    "hashtagId" INTEGER,

    CONSTRAINT "ProgramHashtags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProgramHashtags" ADD CONSTRAINT "ProgramHashtags_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramHashtags" ADD CONSTRAINT "ProgramHashtags_hashtagId_fkey" FOREIGN KEY ("hashtagId") REFERENCES "Hashtag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
