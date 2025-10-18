/*
  Warnings:

  - You are about to drop the column `totalPapers` on the `SchoolDetails` table. All the data in the column will be lost.
  - You are about to drop the column `schoolCode` on the `Teacher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Batch" ADD COLUMN     "students" TEXT[],
ADD COLUMN     "teachers" TEXT[],
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "image" SET DEFAULT '';

-- AlterTable
ALTER TABLE "SchoolDetails" DROP COLUMN "totalPapers",
ADD COLUMN     "totalExams" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "batchs" TEXT[];

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "schoolCode",
ADD COLUMN     "batches" TEXT[];

-- CreateTable
CREATE TABLE "Exam" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "schooldId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentExamDetails" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "activeExams" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentExamDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeacherExamDetails" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "activeExams" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeacherExamDetails_pkey" PRIMARY KEY ("id")
);
