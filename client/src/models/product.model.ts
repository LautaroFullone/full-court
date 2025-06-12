export const CATEGORY_TYPES_VALUES = [
   'kiosco',
   'cafeteria',
   'accesorios',
   'otro',
] as const

export type CategoryType = (typeof CATEGORY_TYPES_VALUES)[number]
export interface Product {
   id: string
   name: string
   price: number
   stock: number
   category: string
}

export type ProductFormData = Omit<Product, 'id'>
