-- CreateTable
CREATE TABLE "Record" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "baseProgramId" INTEGER,
    "baseWorkoutIndex" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordExercise" (
    "id" SERIAL NOT NULL,
    "recordId" INTEGER NOT NULL,
    "recordExerciseIndex" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecordExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordExerciseSet" (
    "id" SERIAL NOT NULL,
    "recordExerciseId" INTEGER NOT NULL,
    "exercise" TEXT NOT NULL,
    "setCount" INTEGER NOT NULL,
    "repCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecordExerciseSet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordExercise" ADD CONSTRAINT "RecordExercise_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordExerciseSet" ADD CONSTRAINT "RecordExerciseSet_recordExerciseId_fkey" FOREIGN KEY ("recordExerciseId") REFERENCES "RecordExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
