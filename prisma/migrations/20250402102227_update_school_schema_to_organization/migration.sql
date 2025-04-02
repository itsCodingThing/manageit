/*
  Warnings:

  - You are about to drop the `School` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SchoolAdminUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SchoolDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SchoolAdminUser" DROP CONSTRAINT "SchoolAdminUser_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "SchoolDetails" DROP CONSTRAINT "SchoolDetails_schoolId_fkey";

-- DropTable
DROP TABLE "School";

-- DropTable
DROP TABLE "SchoolAdminUser";

-- DropTable
DROP TABLE "SchoolDetails";

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "address" TEXT NOT NULL DEFAULT 'no address available',
    "type" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'no image available',
    "status" TEXT NOT NULL DEFAULT 'pending',

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationAdmin" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact" TEXT NOT NULL,

    CONSTRAINT "OrganizationAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationDetails" (
    "organizationId" TEXT NOT NULL,
    "total_batches" INTEGER NOT NULL DEFAULT 0,
    "total_papers" INTEGER NOT NULL DEFAULT 0,
    "total_students" INTEGER NOT NULL DEFAULT 0,
    "total_teachers" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationAdmin_email_key" ON "OrganizationAdmin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationDetails_organizationId_key" ON "OrganizationDetails"("organizationId");

-- AddForeignKey
ALTER TABLE "OrganizationAdmin" ADD CONSTRAINT "OrganizationAdmin_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationDetails" ADD CONSTRAINT "OrganizationDetails_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
