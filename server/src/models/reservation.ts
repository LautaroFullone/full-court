import { z } from 'zod'
import { clientSchema } from './client'

// export const reservationSchema = z.object({
//    date: z.coerce.date(),
//    shift: z.string().nonempty(),
//    courtId: z.string().nonempty(),
//    ownerId: z.uuid(),
//    price: z.number().nonnegative(),
//    items: z
//       .array(
//          z.object({
//             productName: z.string().nonempty(),
//             price: z.number().nonnegative(),
//             amount: z.number().int().positive(),
//          })
//       )
//       .optional(),
// })

export const reservationSchema = clientSchema.extend({
   courtID: z.string(),
   shift: z.string(),
   clientType: z.string().nonempty(),
   reservationType: z.string().nonempty(),
})

export type ReservationData = z.infer<typeof reservationSchema>
