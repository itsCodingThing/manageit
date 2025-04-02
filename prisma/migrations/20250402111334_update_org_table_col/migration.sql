/*
  Warnings:

  - The primary key for the `Organization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Organization` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `OrganizationAdmin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `OrganizationAdmin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `organizationId` on the `OrganizationAdmin` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `organizationId` on the `OrganizationDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "OrganizationAdmin" DROP CONSTRAINT "OrganizationAdmin_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "OrganizationDetails" DROP CONSTRAINT "OrganizationDetails_organizationId_fkey";

-- AlterTable
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Organization_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "OrganizationAdmin" DROP CONSTRAINT "OrganizationAdmin_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "organizationId",
ADD COLUMN     "organizationId" INTEGER NOT NULL,
ADD CONSTRAINT "OrganizationAdmin_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "OrganizationDetails" DROP COLUMN "organizationId",
ADD COLUMN     "organizationId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationDetails_organizationId_key" ON "OrganizationDetails"("organizationId");

-- AddForeignKey
ALTER TABLE "OrganizationAdmin" ADD CONSTRAINT "OrganizationAdmin_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationDetails" ADD CONSTRAINT "OrganizationDetails_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
