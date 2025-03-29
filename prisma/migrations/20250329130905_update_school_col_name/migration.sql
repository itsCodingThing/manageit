/*
  Warnings:

  - You are about to drop the column `rollNo` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `schoolId` on the `Student` table. All the data in the column will be lost.
  - Added the required column `school_id` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "rollNo",
DROP COLUMN "schoolId",
ADD COLUMN     "roll_no" TEXT DEFAULT '',
ADD COLUMN     "school_id" INTEGER NOT NULL;
