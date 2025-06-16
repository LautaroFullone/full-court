import { Client, Product, Reservation } from '@models'

export interface ResponseApi {
   message: string
   client: Client
   clients: Client[]
   product: Product
   products: Product[]
   reservation: Reservation
   reservations: Reservation[]
}
