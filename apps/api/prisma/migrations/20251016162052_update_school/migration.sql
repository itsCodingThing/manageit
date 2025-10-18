/*
  Warnings:

  - You are about to drop the column `password` on the `SchoolAdmin` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."SchoolAdmin" DROP CONSTRAINT "SchoolAdmin_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SchoolDetails" DROP CONSTRAINT "SchoolDetails_schoolId_fkey";

-- AlterTable
ALTER TABLE "SchoolAdmin" DROP COLUMN "password";

-- AddForeignKey
ALTER TABLE "SchoolAdmin" ADD CONSTRAINT "SchoolAdmin_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolDetails" ADD CONSTRAINT "SchoolDetails_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;
