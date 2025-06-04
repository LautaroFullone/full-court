import { reservationSchema } from '../models/reservation'
import { Router, Request, Response } from 'express'
import { Reservation } from '@prisma/client'
import prisma from '../lib/prismaClient'

interface ResponseEntity {
   message: string
   reservation?: Reservation
   reservations?: Reservation[]
   error?: unknown
}

const reservationsRouter = Router()

reservationsRouter.get('/', async (req: Request, res: Response<ResponseEntity>) => {
   try {
      const reservations = await prisma.reservation.findMany({
         orderBy: { date: 'desc' },
         include: { owner: true },
      })

      res.status(200).send({ message: 'Reservas obtenidas', reservations })
   } catch (error) {
      res.status(500).send({ message: 'Error obteniendo las reservas', error })
   }
})

reservationsRouter.post('/', async (req: Request, res: Response<ResponseEntity>) => {
   try {
      console.log('## reservation: ', req.body)
      const data = reservationSchema.parse(req.body)

      const existingReservation = await prisma.reservation.findFirst({
         where: { date: data.date, shift: data.shift, courtId: data.courtId },
      })

      if (existingReservation) {
         res.status(400).send({
            message: 'Ya existe una reserva para el turno seleccionado',
            reservation: existingReservation,
         })
         return
      }

      const reservation = await prisma.reservation.create({
         data,
      })

      res.status(201).send({ message: 'Reserva creada', reservation })
   } catch (error) {
      console.log(error)
      res.status(500).send({
         message: 'Error creando la reserva',
         error,
      })
   }
})

export default reservationsRouter
