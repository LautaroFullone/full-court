import { z } from 'zod'

export const clientSchema = z.object({
   dni: z.string().min(6),
   name: z.string().min(1),
   phone: z.string().nonempty(),
   email: z.string().email().or(z.literal('')).optional(),
   lastVisit: z.coerce.date().optional(),
})

export const clientUpdateSchema = clientSchema.partial()

export type ClientInput = z.infer<typeof clientSchema>
export type ClientUpdateInput = z.infer<typeof clientUpdateSchema>
