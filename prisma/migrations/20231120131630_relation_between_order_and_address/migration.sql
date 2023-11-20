-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "orderId" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
