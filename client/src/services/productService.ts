import { Product, ProductFormData } from '@models'
import { api, handleApiError } from '@lib'

interface ResponseApi {
   product: Product
   products: Product[]
   message: string
}

export async function getProducts() {
   type Response = Pick<ResponseApi, 'message' | 'products'>

   try {
      const { data } = await api.get<Response>(`/products`, {})
      return data
   } catch (error) {
      throw handleApiError(error)
   }
}

export async function createProduct(productData: ProductFormData) {
   type Response = Pick<ResponseApi, 'message' | 'product'>

   try {
      const { data } = await api.post<Response>(`/products`, productData, {})
      return data
   } catch (error) {
      throw handleApiError(error)
   }
}

export async function deleteProduct(productID: Product['id']) {
   type Response = Pick<ResponseApi, 'message' | 'product'>

   try {
      const { data } = await api.delete<Response>(`/products/${productID}`)
      return data
   } catch (error) {
      throw handleApiError(error)
   }
}

export async function updateProduct({
   productID,
   productData,
}: {
   productID: Product['id']
   productData: ProductFormData
}) {
   type Response = Pick<ResponseApi, 'message' | 'product'>

   try {
      const { data } = await api.put<Response>(`/products/${productID}`, productData)
      return data
   } catch (error) {
      throw handleApiError(error)
   }
}
