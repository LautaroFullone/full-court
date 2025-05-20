export interface Product {
   id: string
   name: string
   price: string
   stock: number
   category: string
}

export type ProductFormData = Omit<Product, 'id'>
