import { CLIENTS, Reservation, RESERVATION_TYPES_VALUES, SHIFT_VALUES } from '@models'
import { format } from 'date-fns'

const possibleItems = [
   { id: '1', name: 'Café', price: 300 },
   { id: '2', name: 'Tubo de pelotas', price: 1200 },
   { id: '3', name: 'Agua', price: 500 },
   { id: '4', name: 'Gaseosa', price: 800 },
   { id: '5', name: 'Barrita energética', price: 650 },
   { id: '6', name: 'Toalla', price: 1000 },
]

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

            const numberOfItems = Math.floor(Math.random() * 6)
            const selectedItems = [...possibleItems]
               .sort(() => 0.5 - Math.random())
               .slice(0, numberOfItems)
               .map((item) => ({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  amount: Math.floor(Math.random() * 3) + 1, // entre 1 y 3
               }))

            reservations.push({
               id: `${idCounter}`,
               date: formattedDate,
               shift,
               courtId,
               turnId,
               owner,
               price,
               items: selectedItems,
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
