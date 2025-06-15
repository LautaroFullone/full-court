import { Client, Product, Reservation } from '@prisma/client'

export interface ResponseEntity {
   message: string
   client?: Client
   clients?: Client[]
   product?: Product
   products?: Product[]
   reservation?: Reservation
   reservations?: Reservation[]
   error?: unknown
}
