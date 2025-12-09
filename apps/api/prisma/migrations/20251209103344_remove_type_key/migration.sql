/*
  Warnings:

  - You are about to drop the column `type` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Batch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Exam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `School` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SchoolDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentExamDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Teacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeacherExamDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SchoolDetails" DROP CONSTRAINT "SchoolDetails_schoolId_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "type";

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Batch";

-- DropTable
DROP TABLE "Exam";

-- DropTable
DROP TABLE "School";

-- DropTable
DROP TABLE "SchoolDetails";

-- DropTable
DROP TABLE "Student";

-- DropTable
DROP TABLE "StudentExamDetails";

-- DropTable
DROP TABLE "Teacher";

-- DropTable
DROP TABLE "TeacherExamDetails";

-- CreateTable
CREATE TABLE "admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "batch" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT DEFAULT '',
    "teachers" TEXT[],
    "students" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "schooldId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "school" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL DEFAULT 'no address available',
    "type" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'no image available',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "schoolAdmins" TEXT[],

    CONSTRAINT "school_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schoolDetails" (
    "schoolId" TEXT NOT NULL,
    "totalBatches" INTEGER NOT NULL DEFAULT 0,
    "totalExams" INTEGER NOT NULL DEFAULT 0,
    "totalStudents" INTEGER NOT NULL DEFAULT 0,
    "totalTeachers" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "student" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dob" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "rollNo" TEXT DEFAULT '',
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "image" TEXT DEFAULT 'https://picsum.photos/200',
    "address" TEXT DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'active',
    "batchs" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studentExamDetails" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "activeExams" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "studentExamDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teacher" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT DEFAULT '',
    "image" TEXT DEFAULT 'https://picsum.photos/200',
    "dob" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'active',
    "isSchoolAdmin" BOOLEAN NOT NULL DEFAULT false,
    "batches" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teacherExamDetails" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "activeExams" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "teacherExamDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "schoolDetails_schoolId_key" ON "schoolDetails"("schoolId");

-- AddForeignKey
ALTER TABLE "schoolDetails" ADD CONSTRAINT "schoolDetails_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE CASCADE ON UPDATE CASCADE;
