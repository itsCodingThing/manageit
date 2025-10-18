/*
  Warnings:

  - A unique constraint covering the columns `[contact]` on the table `SchoolAdmin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SchoolAdmin_contact_key" ON "SchoolAdmin"("contact");
