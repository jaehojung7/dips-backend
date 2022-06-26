-- AlterTable
ALTER TABLE "WorkoutSet" ADD COLUMN     "workoutIndex" INTEGER,
ALTER COLUMN "programId" DROP NOT NULL;
