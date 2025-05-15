import { CLIENTS, Reservation, RESERVATION_TYPES_VALUES, SHIFT_VALUES } from '@models'
import { format } from 'date-fns'

const courtIds = ['court_1', 'court_2', 'court_3', 'court_4']

const useMock = () => {
   function generateMockReservations() {
      const reservations: Reservation[] = []

      const today = new Date()
      const daysOffset = [-1, 0, 1] // ayer, hoy, mañana

      let idCounter = 1

      for (const offset of daysOffset) {
         const date = new Date(today)
         date.setDate(today.getDate() + offset)
         const formattedDate = format(date, 'dd/MM/yyyy')

         for (let i = 0; i < 10; i++) {
            const shift = SHIFT_VALUES[Math.floor(Math.random() * SHIFT_VALUES.length)]
            const courtId = courtIds[i % courtIds.length]
            const turnId = `${idCounter}`
            const clientIndex =
               (((i + offset * 3) % CLIENTS.length) + CLIENTS.length) % CLIENTS.length
            const owner = CLIENTS[clientIndex]
            const price = 100 + Math.floor(Math.random() * 101) // entre 100 y 200
            const typeIndex =
               (((i + offset) % RESERVATION_TYPES_VALUES.length) +
                  RESERVATION_TYPES_VALUES.length) %
               RESERVATION_TYPES_VALUES.length
            const type = RESERVATION_TYPES_VALUES[typeIndex]

            reservations.push({
               id: `${idCounter}`,
               date: formattedDate,
               shift,
               courtId,
               turnId,
               owner,
               price,
               type,
            })

            idCounter++
         }
      }

      return reservations
   }

   return { generateMockReservations }
}

export default useMock
