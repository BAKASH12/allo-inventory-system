/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `warehouseId` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `inventoryId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Reservation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Inventory_productId_warehouseId_key";

-- AlterTable
ALTER TABLE "Inventory" ALTER COLUMN "reservedStock" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "createdAt",
DROP COLUMN "productId",
DROP COLUMN "warehouseId",
ADD COLUMN     "inventoryId" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ReservationStatus";

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
