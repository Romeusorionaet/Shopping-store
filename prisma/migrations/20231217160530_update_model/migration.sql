/*
  Warnings:

  - You are about to drop the `AdmPassword` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "AdmPassword";

-- CreateTable
CREATE TABLE "AdmAccessKey" (
    "id" TEXT NOT NULL,
    "admKey" TEXT NOT NULL,
    "token" TEXT,

    CONSTRAINT "AdmAccessKey_pkey" PRIMARY KEY ("id")
);
