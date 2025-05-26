import { clientSchema, clientUpdateSchema } from '../models/client'
import { Router, Request, Response } from 'express'
import prisma from '../lib/prismaClient'

const clientsRouter = Router()

clientsRouter.get('/', async (_req: Request, res: Response) => {
   try {
      const clients = await prisma.client.findMany({
         orderBy: { createdAt: 'desc' },
      })

      res.status(200).send(clients)
   } catch (error) {
      res.status(500).send({ message: 'GET CLIENTS ERROR', error })
   }
})

clientsRouter.post('/', async (req: Request, res: Response) => {
   try {
      const data = clientSchema.parse(req.body)

      const existingClient = await prisma.client.findFirst({
         where: { dni: data.dni },
      })

      if (existingClient) {
         res.status(400).send({
            message: 'Client with this DNI already exists',
            client: existingClient,
         })
         return
      }

      const client = await prisma.client.create({ data })

      res.status(201).send(client)
   } catch (error) {
      console.log('Error creating client:', error)
      res.status(500).send({
         message: 'CREATE CLIENT ERROR',
         error,
      })
   }
})

clientsRouter.put('/:id', async (req: Request, res: Response) => {
   try {
      const { id } = req.params
      const clientdata = clientUpdateSchema.parse(req.body)

      const clientUpdated = await prisma.client.update({
         where: { id },
         data: clientdata,
      })

      res.status(200).send(clientUpdated)
   } catch (error) {
      res.status(500).send({
         message: 'UPDATE CLIENT ERROR',
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
         res.status(404).send({ message: 'Client not found' })
         return
      }

      await prisma.client.delete({ where: { id } })

      res.status(204).send()
   } catch (error: any) {
      res.status(500).send({
         message: 'DELETE CLIENT ERROR',
         error,
      })
   }
})

export default clientsRouter
