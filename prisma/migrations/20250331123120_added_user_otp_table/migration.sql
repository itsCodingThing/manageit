-- CreateTable
CREATE TABLE "UserOTP" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "otp" TEXT NOT NULL,

    CONSTRAINT "UserOTP_pkey" PRIMARY KEY ("id")
);
