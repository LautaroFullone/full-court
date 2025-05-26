/*
  Warnings:

  - You are about to drop the column `courtId` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `owner` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "courtId",
DROP COLUMN "owner",
DROP COLUMN "type",
ADD COLUMN     "clientId" TEXT NOT NULL,
ADD COLUMN     "items" JSONB;

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dni" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "lastVisit" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
