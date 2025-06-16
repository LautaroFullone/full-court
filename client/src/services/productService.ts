import { Product, ProductFormData } from '@models'
import { ResponseApi } from './ResponseApi'
import { api } from '@lib'

interface UpdateProductParams {
   productID: Product['id']
   productData: ProductFormData
}

export async function getProducts() {
   type Response = Pick<ResponseApi, 'message' | 'products'>
   return await api.get<Response>(`/products`)
}

export async function createProduct(productData: ProductFormData) {
   type Response = Pick<ResponseApi, 'message' | 'product'>
   return await api.post<Response>(`/products`, productData)
}

export async function deleteProduct(productID: Product['id']) {
   type Response = Pick<ResponseApi, 'message' | 'product'>
   return await api.delete<Response>(`/products/${productID}`)
}
export async function updateProduct({ productID, productData }: UpdateProductParams) {
   type Response = Pick<ResponseApi, 'message' | 'product'>
   return await api.put<Response>(`/products/${productID}`, productData)
}
