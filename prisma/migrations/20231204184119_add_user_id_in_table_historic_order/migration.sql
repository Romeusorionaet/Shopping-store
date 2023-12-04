/*
  Warnings:

  - Added the required column `userId` to the `HistoricOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HistoricOrder" ADD COLUMN     "userId" TEXT NOT NULL;
