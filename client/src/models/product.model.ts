import { z } from 'zod'

export interface Product {
   id: string
   name: string
   price: number
   stock: number
   category: string
}

export const productValidationSchema = z.object({
   name: z
      .string()
      .min(1, 'El nombre es obligatorio')
      .max(50, 'El nombre no puede superar los 50 caracteres'),

   price: z
      .number({ invalid_type_error: 'El precio debe ser un número' })
      .min(0, { message: 'El precio no puede ser negativo' }),

   stock: z
      .number({ invalid_type_error: 'El stock debe ser un número' })
      .min(0, { message: 'El stock no puede ser negativo' })
      .int({ message: 'El stock debe ser un número entero' }),

   category: z.string().min(1, 'La categoria es obligatoria'),
})

export type ProductFormData = z.infer<typeof productValidationSchema>
