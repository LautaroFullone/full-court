import { clientSchema, clientUpdateSchema } from '../models/client'
import { Client, Reservation } from '@prisma/client'
import { Router, Request, Response } from 'express'
import prisma from '../lib/prismaClient'
import { sleep } from '../lib/sleep'
import { ApiError } from '../lib/ApiError'

interface ResponseEntity {
   message: string
   client?: Client
   clients?: Client[]
   reservations?: Reservation[]
   error?: unknown
}

const clientsRouter = Router()

clientsRouter.get('/', async (_req: Request, res: Response<ResponseEntity>) => {
   try {
      const clients = await prisma.client.findMany({
         orderBy: { createdAt: 'desc' },
      })

      await sleep(2000)

      res.status(200).send({
         message: 'Clientes obtenidos',
         clients,
      })
   } catch (error) {
      res.status(500).send({ message: 'Error obteniendo los clientes', error })
   }
})

clientsRouter.post('/', async (req: Request, res: Response<ResponseEntity>) => {
   try {
      const data = clientSchema.parse(req.body)

      const existingClient = await prisma.client.findFirst({
         where: { dni: data.dni },
      })

      await sleep(2000)

      if (existingClient) {
         res.status(400).send({
            message: 'Ya existe un cliente con este DNI',
            client: existingClient,
         })
         return
      }
      const client = await prisma.client.create({ data })

      res.status(201).send({ message: 'Cliente creado', client })
   } catch (error) {
      console.log(error)
      res.status(500).send({
         message: 'Error creando el cliente',
         error,
      })
   }
})

clientsRouter.put('/:id', async (req: Request, res: Response<ResponseEntity>) => {
   try {
      const { id } = req.params
      const clientdata = clientUpdateSchema.parse(req.body)

      const clientUpdated = await prisma.client.update({
         where: { id },
         data: clientdata,
      })

      await sleep(2000)

      res.status(200).send({
         message: 'Cliente actualizado',
         client: clientUpdated,
      })
   } catch (error) {
      res.status(500).send({
         message: 'Error actualizando el cliente',
         error,
      })
   }
})

clientsRouter.delete('/:id', async (req: Request, res: Response) => {
   try {
      const { id } = req.params

      const clientToDelete = await prisma.client.findFirst({
         where: { id },
      })

      if (!clientToDelete) {
         throw new ApiError(404, 'CLIENT_NOT_FOUND')
      }

      const clientReservations = await prisma.reservation.findMany({
         where: { ownerId: id },
      })

      if (clientReservations.length > 0) {
         throw new ApiError(400, 'CLIENT_HAS_RESERVATIONS', { reservations: clientReservations })
      }

      await prisma.client.delete({ where: { id } })

      await sleep(2000)

      return res.status(200).send({ message: 'Cliente eliminado', client: clientToDelete })
   } catch (error: any) {
      console.log(error)
      if (error instanceof ApiError) {
         return res.status(error.statusCode).send({
            errorCode: error.errorCode,
            ...error.data,
         })
      }

      return res.status(500).send({ code: 'INTERNAL_SERVER_ERROR' })
      // return res.status(500).send({
      //    message: 'Error eliminando el cliente',
      //    error,
      // })
   }
})

export default clientsRouter
