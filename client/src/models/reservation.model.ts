import { ShiftType } from './shift.model'

interface Item {
   name: string
   price: number
   amount: number
}

export const reservationTypeValues = ['clase', 'partido', 'torneo', 'otro'] as const

export type ReservationType = (typeof reservationTypeValues)[number]

export interface Reservation {
   id: string
   date: string
   shift: ShiftType
   courtId: string
   turnId: string
   owner: string
   price: number
   items?: Item[]
   type: ReservationType
}
