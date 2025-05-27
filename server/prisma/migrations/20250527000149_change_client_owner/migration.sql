/*
  Warnings:

  - You are about to drop the column `clientId` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_clientId_fkey";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "clientId",
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
