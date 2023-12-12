-- DropForeignKey
ALTER TABLE "OrderAddress" DROP CONSTRAINT "OrderAddress_orderId_fkey";

-- AddForeignKey
ALTER TABLE "OrderAddress" ADD CONSTRAINT "OrderAddress_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
