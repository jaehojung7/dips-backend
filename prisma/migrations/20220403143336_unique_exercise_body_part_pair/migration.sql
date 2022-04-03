/*
  Warnings:

  - A unique constraint covering the columns `[exercise,bodyPart]` on the table `Exercise` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Exercise_exercise_bodyPart_key" ON "Exercise"("exercise", "bodyPart");
