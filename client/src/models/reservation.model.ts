import { Client } from './client.model'
import { ShiftType } from './shift.model'

interface Item {
   name: string
   price: number
   amount: number
}

export const RESERVATION_TYPES_VALUES = ['clase', 'partido', 'torneo', 'otro'] as const

export type ReservationType = (typeof RESERVATION_TYPES_VALUES)[number]

export interface Reservation {
   id: string
   date: string
   shift: ShiftType
   courtId: string
   turnId: string
   owner: Client
   price: number
   items?: Item[]
   type: ReservationType
}
