import { z } from 'zod'

export const clientSchema = z.object({
   name: z
      .string()
      .min(1, 'El nombre es obligatorio')
      .max(50, 'El nombre no puede superar los 50 caracteres'),
   dni: z
      .string()
      .min(6, { message: 'El DNI debe tener al menos 6 dígitos' })
      .max(10, { message: 'El DNI no puede tener más de 10 dígitos' })
      .regex(/^\d+$/, { message: 'El DNI debe contener solo números' }),
   phone: z
      .string()
      .min(6, 'El celular es obligatorio')
      .max(20, 'El celular es demasiado largo')
      .regex(/^\d+$/, { message: 'El celular debe contener solo números' }),
   email: z.string().email('Debe ser un email válido').or(z.literal('')).optional(),
})

export const clientUpdateSchema = clientSchema.partial()

export type ClientInput = z.infer<typeof clientSchema>
export type ClientUpdateInput = z.infer<typeof clientUpdateSchema>
