import { z } from 'zod'

export const productSchema = z.object({
   name: z
      .string()
      .min(1, 'El nombre es obligatorio')
      .max(50, 'El nombre no puede superar los 50 caracteres'),

   price: z.coerce.number().min(0, 'El precio es obligatorio'),

   stock: z.coerce.number().min(0, 'El stock es obligatorio').int(),

   category: z.string().min(1, 'La categoria es obligatoria'),
})

export const productUpdateSchema = productSchema.partial()

export type ProductInput = z.infer<typeof productSchema>
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>
