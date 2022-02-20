-- AlterTable
ALTER TABLE "TemplateSet" ALTER COLUMN "exercise" SET NOT NULL,
ALTER COLUMN "exercise" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "exercise" TEXT NOT NULL,
    "bodyPart" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_exercise_key" ON "Exercise"("exercise");

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
