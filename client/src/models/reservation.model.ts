import { Client, ClientType } from './client.model'
import { ShiftType } from './shift.model'
import { Product } from './product.model'

export const RESERVATION_TYPES_VALUES = ['clase', 'partido', 'torneo', 'otro'] as const

export type ReservationType = (typeof RESERVATION_TYPES_VALUES)[number]

type ReservationProducts = Omit<Product, 'stock'> & { amount: number }

export interface Reservation {
   id: string
   date: string
   shift: ShiftType
   courtId: string
   turnId: string
   owner: Client
   price: number
   products?: ReservationProducts[]
   type: ReservationType
}

// Valida fechas en formato dd/mm/aaaa
// const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/

export type ReservationFormData = {
   type: ReservationType
   clientType: ClientType
   client: Partial<Client>
}
