import { z } from 'zod'

export const clientSchema = z.object({
   name: z.string().min(1),
   dni: z.string().optional(),
   phone: z.string().min(6),
   email: z.string().email().optional(),
   lastVisit: z.coerce.date().optional(),
})

export const clientUpdateSchema = clientSchema.partial()

export type ClientInput = z.infer<typeof clientSchema>
export type ClientUpdateInput = z.infer<typeof clientUpdateSchema>
