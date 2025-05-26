-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "shift" TEXT NOT NULL,
    "courtId" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);
