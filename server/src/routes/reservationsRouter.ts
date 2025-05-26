import { createReservation, getAllReservations } from '../services/reservationsService'
import { Router, Request, Response } from 'express'
import { reservationSchema } from '../models'
import { z } from 'zod/v4'

const reservationsRouter = Router()

reservationsRouter.get('/', async (_req: Request, res: Response) => {
   try {
      const reservations = await getAllReservations()
      res.status(200).send(reservations)
   } catch (error) {
      res.status(500).send({ message: 'GET RESERVATION ERROR', error: error })
   }
})

reservationsRouter.post('/', async (req: Request, res: Response) => {
   try {
      const parsed = reservationSchema.parse(req.body)
      const created = await createReservation(parsed)

      res.status(201).send(created)
   } catch (error) {
      res.status(500).send({
         message: 'POST RESERVATION ERROR',
         error: error instanceof z.ZodError ? z.prettifyError(error) : error,
      })
   }
})

export default reservationsRouter
