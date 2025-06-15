import { reservationSchema } from '../models/reservation'
import { ResponseEntity } from '../lib/ResponseEntity'
import { Router, Request, Response } from 'express'
import { ApiError } from '../lib/ApiError'
import prisma from '../lib/prismaClient'
import { sleep } from '../lib/sleep'
import { Reservation } from '@prisma/client'

const reservationsRouter = Router()

reservationsRouter.get('/', async (req: Request, res: Response<ResponseEntity>) => {
   await sleep(2000)
   const { date } = req.query

   try {
      const reservations = await prisma.reservation.findMany({
         where: { date: date as string },
         orderBy: { date: 'desc' },
         include: { owner: true },
         // omit: { ownerId: true },
      })

      return res.status(200).send({ message: 'Reservas obtenidas', reservations })
   } catch (error) {
      console.log(error)
      if (error instanceof ApiError) {
         return res.status(error.statusCode).send({
            message: error.message,
            ...error.data,
         })
      }

      return res.status(500).send({ message: 'Ocurrió un error inesperado del servidor' })
   }
})

reservationsRouter.post('/', async (req: Request, res: Response<ResponseEntity>) => {
   await sleep(2000)
   try {
      const data = reservationSchema.parse(req.body)

      const { type, clientType, client, courtID, date, shift } = data

      let clientId = ''

      if (clientType === 'existing-client') {
         if (!client.id) {
            throw new ApiError('Debe seleccionar un cliente existente')
         }

         const existingClient = await prisma.client.findUnique({ where: { id: client.id } })

         if (!existingClient) {
            throw new ApiError('Cliente no encontrado')
         }

         clientId = existingClient.id
      } else if (clientType === 'new-client') {
         const { name, dni, phone } = client

         const existingClient = await prisma.client.findUnique({ where: { dni: client.dni } })

         if (existingClient) {
            throw new ApiError('Ya existe un cliente con ese DNI')
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
         throw new ApiError('Tipo de cliente inválido')
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
         // omit: { ownerId: true },
      })

      const owner = await prisma.client.update({
         where: { id: clientId },
         data: {
            lastVisit: new Date(),
         },
      })

      return res.status(201).send({
         message: 'Reserva creada',
         reservation: { ...reservation, owner } as any,
      })
   } catch (error) {
      console.log(error)
      if (error instanceof ApiError) {
         return res.status(error.statusCode).send({
            message: error.message,
            ...error.data,
         })
      }

      return res.status(500).send({ message: 'Ocurrió un error inesperado del servidor' })
   }
})

reservationsRouter.put('/:id', async (req: Request, res: Response<ResponseEntity>) => {
   await sleep(2000)
   const { id } = req.params
   const { type, clientType, client } = req.body

   try {
      const existingReservation = await prisma.reservation.findUnique({ where: { id } })

      if (!existingReservation) {
         throw new ApiError('Reserva no encontrada')
      }

      let clientId = ''

      if (clientType === 'existing-client') {
         if (!client.id) {
            throw new ApiError('Debe seleccionar un cliente existente')
         }

         const existingClient = await prisma.client.findUnique({ where: { id: client.id } })

         if (!existingClient) {
            throw new ApiError('Cliente no encontrado')
         }

         clientId = existingClient.id
      } else if (clientType === 'new-client') {
         const { name, dni, phone } = client

         const alreadyExists = await prisma.client.findUnique({ where: { dni } })

         if (alreadyExists) {
            throw new ApiError('Ya existe un cliente con ese DNI')
         }

         const newClient = await prisma.client.create({
            data: { name, dni, phone },
         })

         clientId = newClient.id
      } else {
         throw new ApiError('Tipo de cliente inválido')
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
         message: 'Reserva actualizada',
         reservation: updatedReservation,
      })
   } catch (error) {
      console.log(error)
      if (error instanceof ApiError) {
         return res.status(error.statusCode).send({
            message: error.message,
            ...error.data,
         })
      }

      return res.status(500).send({ message: 'Ocurrió un error inesperado del servidor' })
   }
})

reservationsRouter.delete('/:id', async (req: Request, res: Response<ResponseEntity>) => {
   await sleep(2000)
   const { id } = req.params
   try {
      const existingReservation = await prisma.reservation.findUnique({
         where: { id },
      })

      if (!existingReservation) {
         throw new ApiError('Reserva no encontrada')
      }

      const reservation = await prisma.reservation.delete({
         where: { id },
      })

      return res.send({ message: 'Reserva eliminada', reservation })
   } catch (error) {
      console.log(error)
      if (error instanceof ApiError) {
         return res.status(error.statusCode).send({
            message: error.message,
            ...error.data,
         })
      }

      return res.status(500).send({ message: 'Ocurrió un error inesperado del servidor' })
   }
})

export default reservationsRouter
