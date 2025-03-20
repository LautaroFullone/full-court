interface Item {
   name: string
   price: number
   amount: number
}

export type ReservationType = 'clase' | 'partido' | 'torneo' | 'otro'

export interface Reservation {
   id: string
   date: string
   courtId: string
   turnId: string
   owner: string
   price: number
   items?: Item[]
   type: ReservationType
}
