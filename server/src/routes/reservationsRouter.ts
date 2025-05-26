import { reservationSchema } from '../models/reservation'
import { Router, Request, Response } from 'express'
import prisma from '../lib/prismaClient'

const reservationsRouter = Router()

reservationsRouter.get('/', async (_req: Request, res: Response) => {
   try {
      const reservations = await prisma.reservation.findMany({
         orderBy: { date: 'desc' },
         include: { client: true },
      })

      res.status(200).send(reservations)
   } catch (error) {
      res.status(500).send({ message: 'GET RESERVATION ERROR', error })
   }
})

reservationsRouter.post('/', async (req: Request, res: Response) => {
   try {
      const data = reservationSchema.parse(req.body)

      const existingReservation = await prisma.reservation.findFirst({
         where: { date: data.date, shift: data.shift, courtId: data.courtId },
      })

      if (existingReservation) {
         res.status(400).send({
            message: 'Reservation already exists for this shift',
            reservation: existingReservation,
         })
         return
      }

      const reservation = await prisma.reservation.create({
         data,
      })

      res.status(201).send(reservation)
   } catch (error) {
      res.status(500).send({
         message: 'POST RESERVATION ERROR',
         error,
      })
   }
})

export default reservationsRouter
