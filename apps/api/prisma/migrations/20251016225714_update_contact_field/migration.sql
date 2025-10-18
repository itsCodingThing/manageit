/*
  Warnings:

  - You are about to drop the column `contact` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `contact` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `contact` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `contact` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `phoneNumber` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "contact",
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "School" DROP COLUMN "contact",
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "contact",
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "contact",
ADD COLUMN     "phoneNumber" TEXT NOT NULL;
