import { z } from 'zod/v4'

export const reservationSchema = z.object({
   date: z.coerce.date(),
   shift: z.string().min(3),
   clientId: z.string().uuid(),
   price: z.number().nonnegative(),
   items: z
      .array(
         z.object({
            productName: z.string().min(1),
            price: z.number().nonnegative(),
            amount: z.number().int().positive(),
         })
      )
      .optional(),
})

export type ReservationData = z.infer<typeof reservationSchema>
