import { clientSchema, clientUpdateSchema } from '../models/client'
import { Router, Request, Response } from 'express'
import prisma from '../lib/prismaClient'
import { Client } from '@prisma/client'

interface ResponseEntity {
   message: string
   client?: Client
   clients?: Client[]
   error?: unknown
}

const clientsRouter = Router()

clientsRouter.get('/', async (_req: Request, res: Response<ResponseEntity>) => {
   try {
      const clients = await prisma.client.findMany({
         orderBy: { createdAt: 'desc' },
      })

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

clientsRouter.delete('/:id', async (req: Request, res: Response<ResponseEntity>) => {
   try {
      const { id } = req.params

      const clientToDelete = await prisma.client.findFirst({
         where: { id },
      })

      if (!clientToDelete) {
         res.status(404).send({ message: 'Client not found' })
         return
      }

      await prisma.client.delete({ where: { id } })

      res.status(204).send({ message: 'Cliente eliminado' })
   } catch (error: any) {
      res.status(500).send({
         message: 'Error eliminando el cliente',
         error,
      })
   }
})

export default clientsRouter
