/*
  Warnings:

  - You are about to drop the column `orderId` on the `Address` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_orderId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "orderId";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderTracking" TEXT NOT NULL DEFAULT 'WAITING';
