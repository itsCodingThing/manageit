/*
  Warnings:

  - You are about to drop the `SchoolAdmin` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `schoolCode` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."SchoolAdmin" DROP CONSTRAINT "SchoolAdmin_schoolId_fkey";

-- AlterTable
ALTER TABLE "School" ADD COLUMN     "schoolAdmins" TEXT[];

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "isSchoolAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "schoolCode" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."SchoolAdmin";
