import { Client, Product, Reservation } from '@prisma/client'

type ApiErrorData =
   | { client: Client }
   | { clients: Client[] }
   | { product: Product }
   | { products: Product[] }
   | { reservation: Reservation }
   | { reservations: Reservation[] }
   | undefined

export class ApiError extends Error {
   statusCode: number
   message: string
   data?: ApiErrorData

   constructor(message: string, data?: ApiErrorData, statusCode = 400) {
      super(message)
      this.name = 'ApiError'
      this.statusCode = statusCode
      this.message = message
      this.data = data
   }
}
