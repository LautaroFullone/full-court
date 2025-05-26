/*
  Warnings:

  - A unique constraint covering the columns `[dni]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Client_dni_key" ON "Client"("dni");
