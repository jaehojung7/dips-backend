/*
  Warnings:

  - You are about to drop the `ProgramHashtags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProgramHashtags" DROP CONSTRAINT "ProgramHashtags_hashtagId_fkey";

-- DropForeignKey
ALTER TABLE "ProgramHashtags" DROP CONSTRAINT "ProgramHashtags_programId_fkey";

-- DropTable
DROP TABLE "ProgramHashtags";

-- CreateTable
CREATE TABLE "_HashtagToProgram" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_HashtagToProgram_AB_unique" ON "_HashtagToProgram"("A", "B");

-- CreateIndex
CREATE INDEX "_HashtagToProgram_B_index" ON "_HashtagToProgram"("B");

-- AddForeignKey
ALTER TABLE "_HashtagToProgram" ADD FOREIGN KEY ("A") REFERENCES "Hashtag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HashtagToProgram" ADD FOREIGN KEY ("B") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;
