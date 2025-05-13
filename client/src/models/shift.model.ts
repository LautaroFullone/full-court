export type Shift = {
   id: string
   time_from: string
   time_to: string
   isReserved?: boolean
}

// Horario disponibles de 8:00 a 00:00 con turnos de 1.5 horas
export const shiftTypeValues = [
   '8:00 - 9:30',
   '9:30 - 11:00',
   '11:00 - 12:30',
   '12:30 - 14:00',
   '14:00 - 15:30',
   '15:30 - 17:00',
   '17:00 - 18:30',
   '18:30 - 20:00',
   '20:00 - 21:30',
   '21:30 - 23:00',
   '23:00 - 00:30',
] as const

export type ShiftType = (typeof shiftTypeValues)[number]
