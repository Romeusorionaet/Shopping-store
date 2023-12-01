/*
  Warnings:

  - The `orderTracking` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "OrderStatusTracking" AS ENUM ('WAITING', 'CANCELED', 'PRODUCT_DELIVERED_TO_CORREIOS', 'PRODUCT_DELIVERED_TO_CLIENT');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "orderTracking",
ADD COLUMN     "orderTracking" "OrderStatusTracking" NOT NULL DEFAULT 'WAITING';

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "placeOfSale" SET DEFAULT 'ONLINE_STORE';
