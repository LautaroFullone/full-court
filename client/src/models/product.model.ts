import { z } from 'zod'

export interface Product {
   id: string
   name: string
   price: number
   stock: number
   category: string
}

export const productFormValidation = z.object({
   name: z
      .string()
      .min(1, 'El nombre es obligatorio')
      .max(50, 'El nombre no puede superar los 50 caracteres'),

   price: z.string().regex(/^\d+$/, 'El precio debe ser un número entero positivo'),

   stock: z.string().regex(/^\d+$/, 'El stock debe ser un número entero positivo'),

   category: z.string().min(1, 'La categoria es obligatoria'),
})

export type ProductFormData = z.infer<typeof productFormValidation>

export const CATEGORY_TYPES_VALUES = [
   'kiosco',
   'cafeteria',
   'accesorios',
   'otro',
] as const

export type CategoryType = (typeof CATEGORY_TYPES_VALUES)[number]
