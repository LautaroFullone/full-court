import { reservationSchema } from '../models/reservation'
import { Router, Request, Response } from 'express'
import { Reservation } from '@prisma/client'
import prisma from '../lib/prismaClient'
import { parseDate } from '../lib/parseDate'

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

      const { type, clientType, client, courtID, date, shift } = data

      let clientId = ''

      if (clientType === 'existing-client') {
         if (!client.id) {
            return res.status(400).send({ message: 'Debe seleccionar un cliente existente' })
         }

         const existingClient = await prisma.client.findUnique({ where: { id: client.id } })
         if (!existingClient) {
            return res.status(404).send({ message: 'Cliente no encontrado' })
         }

         clientId = existingClient.id
      }

      if (clientType === 'new-client') {
         const { name, dni, phone } = client

         // if (!name || !dni || !phone) {
         //    return res.status(400).send({ message: 'Los campos del cliente son obligatorios' })
         // }

         const existingClient = await prisma.client.findUnique({ where: { dni: client.dni } })

         if (existingClient) {
            return res.status(404).send({ message: 'Ya existe un cliente con ese DNI' })
         }

         const newClient = await prisma.client.create({
            data: {
               name,
               dni,
               phone,
            },
         })

         clientId = newClient.id
      }

      const reservation = await prisma.reservation.create({
         data: {
            date: parseDate(date),
            shift,
            // type,
            ownerId: clientId,
            courtId: courtID,
            price: 0, // Set a default price or get it from data if available
         },
      })

      return res.status(201).send({
         message: 'Reserva creada correctamente',
         reservation,
      })
   } catch (error) {
      console.error('Error al crear reserva:', error)
      return res.status(500).send({ message: 'Error interno del servidor' })
   }
})

// reservationsRouter.post('/', async (req: Request, res: Response<ResponseEntity>) => {
//    try {
//       console.log('## reservation: ', req.body)
//       const data = reservationSchema.parse(req.body)

//       const existingReservation = await prisma.reservation.findFirst({
//          where: { date: data.date, shift: data.shift, courtId: data.courtId },
//       })

//       if (existingReservation) {
//          res.status(400).send({
//             message: 'Ya existe una reserva para el turno seleccionado',
//             reservation: existingReservation,
//          })
//          return
//       }

//       const reservation = await prisma.reservation.create({
//          data,
//       })

//       res.status(201).send({ message: 'Reserva creada', reservation })
//    } catch (error) {
//       console.log(error)
//       res.status(500).send({
//          message: 'Error creando la reserva',
//          error,
//       })
//    }
// })

export default reservationsRouter
