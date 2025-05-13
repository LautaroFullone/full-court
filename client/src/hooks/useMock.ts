import { Reservation, ReservationType, shiftSlots } from '@models'
import { format } from 'date-fns'

const courtIds = ['court_1', 'court_2', 'court_3', 'court_4']

const owners = [
   'Carlos Rodríguez',
   'Ana Martínez',
   'Luis González',
   'María López',
   'Juan Pérez',
   'Sofía Ramírez',
   'Diego Fernández',
   'Laura Torres',
   'Pablo Sánchez',
   'Valentina Díaz',
   'Bruno Castro',
   'Lucía Méndez',
   'Martín Núñez',
   'Florencia Rivas',
   'Tomás Herrera',
]

const types: ReservationType[] = ['clase', 'partido', 'torneo', 'otro']

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
            const shift = shiftSlots[Math.floor(Math.random() * shiftSlots.length)]
            const courtId = courtIds[i % courtIds.length]
            const turnId = `${idCounter}`
            const owner = owners[(i + offset * 3) % owners.length]
            const price = 100 + Math.floor(Math.random() * 101) // entre 100 y 200
            const type = types[(i + offset) % types.length]

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
