import { Router, Request, Response } from 'express'
import { clientSchema, clientUpdateSchema } from '../models/client'
import { createClient, deleteClient, getAllClients, updateClient } from '../services/clientsService'

const clientsRouter = Router()

clientsRouter.get('/', async (_req, res) => {
   try {
      const clients = await getAllClients()

      res.send(clients)
   } catch (error) {
      res.status(500).json({ message: 'Error fetching clients' })
   }
})

clientsRouter.post('/', async (req: Request, res: Response) => {
   try {
      const parsed = clientSchema.parse(req.body)
      const created = await createClient(parsed)

      res.status(201).json(created)
   } catch (error: any) {
      res.status(400).json({ message: error.message })
   }
})

clientsRouter.put('/:id', async (req: Request, res: Response) => {
   try {
      const { id } = req.params
      const parsed = clientUpdateSchema.parse(req.body)
      const updated = await updateClient(id, parsed)

      res.json(updated)
   } catch (error: any) {
      res.status(400).json({ message: error.message })
   }
})

clientsRouter.delete('/:id', async (req: Request, res: Response) => {
   try {
      const { id } = req.params
      await deleteClient(id)

      res.status(204).send()
   } catch (error: any) {
      res.status(400).json({ message: error.message })
   }
})

export default clientsRouter
