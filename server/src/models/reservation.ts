import { z } from 'zod/v4'

export const reservationSchema = z.object({
   date: z.coerce.date(),
   shift: z.string().nonempty(),
   courtId: z.string().nonempty(),
   clientId: z.uuid(),
   price: z.number().nonnegative(),
   items: z
      .array(
         z.object({
            productName: z.string().nonempty(),
            price: z.number().nonnegative(),
            amount: z.number().int().positive(),
         })
      )
      .optional(),
})

export type ReservationData = z.infer<typeof reservationSchema>
