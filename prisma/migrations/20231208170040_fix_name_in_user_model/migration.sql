/*
  Warnings:

  - You are about to drop the column `email_Verified` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "email_Verified",
ADD COLUMN     "emailVerified" TIMESTAMP(3);
