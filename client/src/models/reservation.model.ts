import { ShiftType } from './shift.model'
import { Product } from './product.model'
import { Client } from './client.model'

export const RESERVATION_TYPES_VALUES = ['clase', 'partido', 'torneo', 'otro'] as const

export type ReservationType = (typeof RESERVATION_TYPES_VALUES)[number]

type ReservationItem = Omit<Product, 'stock'> & { amount: number }
export interface Reservation {
   id: string
   date: string
   shift: ShiftType
   courtId: string
   turnId: string
   owner: Client
   price: number
   items?: ReservationItem[]
   type: ReservationType
}
