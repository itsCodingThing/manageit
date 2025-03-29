/*
  Warnings:

  - You are about to drop the column `schoolId` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `school_id` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "schoolId",
ADD COLUMN     "school_id" INTEGER NOT NULL;
