/*
  Warnings:

  - Made the column `dni` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `courtId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "dni" SET NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "courtId" TEXT NOT NULL;
