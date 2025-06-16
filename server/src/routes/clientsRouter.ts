import { clientSchema, clientUpdateSchema } from '../models/client'
import { ResponseEntity } from '../lib/ResponseEntity'
import { Router, Request, Response } from 'express'
import { ApiError } from '../lib/ApiError'
import prisma from '../lib/prismaClient'
import { sleep } from '../lib/sleep'

const clientsRouter = Router()

clientsRouter.get('/', async (req: Request, res: Response<ResponseEntity>) => {
   await sleep(2000)
   try {
      const clients = await prisma.client.findMany({
         orderBy: { name: 'asc' },
      })

      return res.status(200).send({ message: 'Clientes obtenidos', clients })
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

clientsRouter.post('/', async (req: Request, res: Response<ResponseEntity>) => {
   await sleep(2000)
   try {
      const data = clientSchema.parse(req.body)

      const existingClient = await prisma.client.findFirst({
         where: { dni: data.dni },
      })

      if (existingClient) {
         throw new ApiError('Ya existe un cliente con este DNI', { client: existingClient })
      }

      const client = await prisma.client.create({ data })

      return res.status(201).send({ message: 'Cliente creado', client })
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

clientsRouter.put('/:id', async (req: Request, res: Response<ResponseEntity>) => {
   await sleep(2000)
   try {
      const { id } = req.params
      const clientdata = clientUpdateSchema.parse(req.body)

      //TODO: verificar que el nuevo dni no sea uno existente
      const clientUpdated = await prisma.client.update({
         where: { id },
         data: clientdata,
      })

      return res.status(200).send({ message: 'Cliente actualizado', client: clientUpdated })
   } catch (error) {
      console.log(error)
      if (error instanceof ApiError) {
         return res.status(error.statusCode).send({
            message: error.message,
            ...(error.data ?? {}),
         })
      }

      return res.status(500).send({ message: 'Ocurrió un error inesperado del servidor' })
   }
})

clientsRouter.delete('/:id', async (req: Request, res: Response<ResponseEntity>) => {
   await sleep(2000)
   try {
      const { id } = req.params

      const clientToDelete = await prisma.client.findFirst({
         where: { id },
      })

      if (!clientToDelete) {
         throw new ApiError('El cliente no existe')
      }

      const clientReservations = await prisma.reservation.findMany({
         where: { ownerId: id },
      })

      if (clientReservations.length > 0) {
         throw new ApiError('No se puede eliminar el cliente porque tiene reservas activas', {
            reservations: clientReservations,
         })
      }

      await prisma.client.delete({ where: { id } })

      return res.status(200).send({ message: 'Cliente eliminado', client: clientToDelete })
   } catch (error: any) {
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

export default clientsRouter
