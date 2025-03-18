export interface Reservation {
   id: string
   court: string
   timeSlot: string
   owner: string
   phone: string
   type: string
}

// Tipos de reserva
export const reservationTypes = {
   clase: 'Clase',
   partido: 'Partido',
   torneo: 'Torneo',
   otro: 'Otro',
}
