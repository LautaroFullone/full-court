import { reservationSchema } from '../models/reservation'
import { Router, Request, Response } from 'express'
import { Reservation } from '@prisma/client'
import prisma from '../lib/prismaClient'
import { sleep } from '../lib/sleep'

interface ResponseEntity {
   message: string
   reservation?: Partial<Reservation>
   reservations?: Partial<Reservation>[]
   error?: unknown
}

const reservationsRouter = Router()

reservationsRouter.get('/', async (req: Request, res: Response<ResponseEntity>) => {
   const { date } = req.query

   try {
      const reservations = await prisma.reservation.findMany({
         where: { date: date as string },
         orderBy: { date: 'desc' },
         include: { owner: true },
         omit: { ownerId: true },
      })

      await sleep(2000)

      return res.status(200).send({ message: 'Reservas obtenidas', reservations })
   } catch (error) {
      return res.status(500).send({ message: 'Error obteniendo las reservas', error })
   }
})

reservationsRouter.post('/', async (req: Request, res: Response<ResponseEntity>) => {
   try {
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
      } else if (clientType === 'new-client') {
         const { name, dni, phone } = client

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
      } else {
         return res.status(400).send({ message: 'Tipo de cliente inválido' })
      }

      const reservation = await prisma.reservation.create({
         data: {
            date: date,
            shift,
            type,
            ownerId: clientId,
            courtId: courtID,
            price: 0, //TODO: variable price in base to reservationType
         },
         include: { owner: true },
         omit: { ownerId: true },
      })

      const owner = await prisma.client.update({
         where: { id: clientId },
         data: {
            lastVisit: new Date(),
         },
      })

      return res.status(201).send({
         message: 'Reserva creada correctamente',
         reservation: { ...reservation, owner } as any,
      })
   } catch (error) {
      console.error('Error al crear reserva:', error)
      return res.status(500).send({ message: 'Error interno del servidor' })
   }
})

reservationsRouter.put('/:id', async (req: Request, res: Response<ResponseEntity>) => {
   try {
      const { id } = req.params
      const { type, clientType, client } = req.body

      const existingReservation = await prisma.reservation.findUnique({ where: { id } })

      if (!existingReservation) {
         return res.status(404).send({ message: 'Reserva no encontrada' })
      }

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
      } else if (clientType === 'new-client') {
         const { name, dni, phone } = client

         const alreadyExists = await prisma.client.findUnique({ where: { dni } })

         if (alreadyExists) {
            return res.status(400).send({ message: 'Ya existe un cliente con ese DNI' })
         }

         const newClient = await prisma.client.create({
            data: { name, dni, phone },
         })

         clientId = newClient.id
      } else {
         return res.status(400).send({ message: 'Tipo de cliente inválido' })
      }

      const updatedReservation = await prisma.reservation.update({
         where: { id },
         data: {
            type,
            ownerId: clientId,
         },
         include: { owner: true },
      })

      await prisma.client.update({
         where: { id: clientId },
         data: {
            lastVisit: new Date(),
         },
      })

      return res.send({
         message: 'Reserva actualizada correctamente',
         reservation: updatedReservation,
      })
   } catch (error) {
      console.error('Error al actualizar reserva:', error)
      return res.status(500).send({ message: 'Error interno del servidor' })
   }
})

reservationsRouter.delete('/:id', async (req: Request, res: Response<ResponseEntity>) => {
   try {
      const { id } = req.params

      const existingReservation = await prisma.reservation.findUnique({
         where: { id },
      })

      if (!existingReservation) {
         return res.status(404).send({ message: 'Reserva no encontrada' })
      }

      const reservation = await prisma.reservation.delete({
         where: { id },
      })

      return res.send({ message: 'Reserva eliminada correctamente', reservation })
   } catch (error) {
      console.error('Error al eliminar reserva:', error)
      return res.status(500).send({ message: 'Error interno del servidor' })
   }
})

export default reservationsRouter
