import prisma from '../lib/prismaClient'
import { ReservationData } from '../models'

export async function getAllReservations() {
   try {
      const reservations = await prisma.reservation.findMany({
         orderBy: { date: 'desc' },
         include: { client: true },
      })

      return reservations
   } catch (error) {
      throw new Error('Error fetching reservations')
   }
}

export async function createReservation(data: ReservationData) {
   try {
      const reservation = await prisma.reservation.create({
         data,
      })

      return reservation
   } catch (error) {
      throw new Error('Error creating reservation')
   }
}
