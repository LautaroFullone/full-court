import { ReservationInput } from "../lib/reservation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getReservations() {
  return prisma.reservation.findMany();
}

export async function createReservation(data: ReservationInput) {
  return prisma.reservation.create({
    data,
  });
}
