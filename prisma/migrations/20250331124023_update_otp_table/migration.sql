/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `UserOTP` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserOTP_user_id_key" ON "UserOTP"("user_id");
