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

// export const reservationSchema = clientSchema.extend({
//    courtID: z.string(),
//    shift: z.string(),
//    clientType: z.string().nonempty(),
//    reservationType: z.string().nonempty(),
// })

// Cliente nuevo
const newClientSchema = z.object({
   clientType: z.literal('new-client'),
   client: z.object({
      name: z.string().min(1, 'El nombre es obligatorio'),
      dni: z.string().min(6, 'El DNI es obligatorio'),
      phone: z.string().min(6, 'El celular es obligatorio'),
   }),
})

// Cliente existente
const existingClientSchema = z.object({
   clientType: z.literal('existing-client'),
   client: z.object({
      id: z.string().uuid('ID inválido'),
   }),
})

// Datos comunes para ambos
const baseReservationSchema = z.object({
   courtID: z.string().nonempty(),
   shift: z.string().nonempty(),
   type: z.string().nonempty(),
   date: z.string().nonempty(), // formato "dd/mm/aaaa"
})

// Unión discriminada por `clientType`
export const reservationSchema = z
   .discriminatedUnion('clientType', [newClientSchema, existingClientSchema])
   .and(baseReservationSchema)

export type ReservationData = z.infer<typeof reservationSchema>
