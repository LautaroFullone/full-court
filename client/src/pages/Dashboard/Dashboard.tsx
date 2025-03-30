import { useCalendar, useMobile } from '@hooks'
import { Court, Reservation } from '@models'
import { Tabs, TabsContent } from '@shadcn'
import { useMemo, useState } from 'react'
import { AppLayout } from '@shared'
import {
   CalendarHandler,
   CourtHandlerMobile,
   ReservationsList,
   ReservationsTable,
   ReservationsViewHandler,
} from './components'

const mockReservations: Reservation[] = [
   {
      id: '1',
      date: '24/05/2023',
      shift: '8:00 - 9:30',
      courtId: '1',
      turnId: '1',
      owner: 'Carlos Rodríguez',
      price: 100,
      type: 'clase',
   },
   {
      id: '2',
      date: '24/05/2023',
      shift: '17:00 - 18:30',
      courtId: '2',
      turnId: '2',
      owner: 'Ana Martínez',
      price: 150,
      type: 'partido',
   },
   {
      id: '3',
      date: '24/05/2023',
      shift: '23:00 - 00:30',
      courtId: '3',
      turnId: '3',
      owner: 'Luis González',
      price: 200,
      type: 'torneo',
   },
   {
      id: '4',
      date: '24/05/2023',
      shift: '11:00 - 12:30',
      courtId: '4',
      turnId: '4',
      owner: 'María López',
      price: 100,
      type: 'clase',
   },
   {
      id: '5',
      date: '24/05/2023',
      shift: '21:30 - 23:00',
      courtId: '1',
      turnId: '5',
      owner: 'Juan Pérez',
      price: 150,
      type: 'partido',
   },
   {
      id: '6',
      date: '24/05/2023',
      shift: '14:00 - 15:30',
      courtId: '2',
      turnId: '6',
      owner: 'Sofía Ramírez',
      price: 120,
      type: 'otro',
   },
   {
      id: '7',
      date: '24/05/2023',
      shift: '18:30 - 20:00',
      courtId: '3',
      turnId: '7',
      owner: 'Diego Fernández',
      price: 100,
      type: 'clase',
   },
   {
      id: '8',
      date: '24/05/2023',
      shift: '20:00 - 21:30',
      courtId: '4',
      turnId: '8',
      owner: 'Laura Torres',
      price: 150,
      type: 'partido',
   },
   {
      id: '9',
      date: '24/05/2023',
      shift: '8:00 - 9:30',
      courtId: '1',
      turnId: '9',
      owner: 'Pablo Sánchez',
      price: 200,
      type: 'torneo',
   },
   {
      id: '10',
      date: '24/05/2023',
      shift: '9:30 - 11:00',
      courtId: '2',
      turnId: '10',
      owner: 'Valentina Díaz',
      price: 150,
      type: 'partido',
   },
]

const Dashboard = () => {
   const [selectedCourt, setSelectedCourt] = useState<Court>()
   const [reservations, setReservations] = useState(mockReservations)

   const isMobile = useMobile()
   const { selectedDate } = useCalendar()
   console.log('## Dashboard selectedDate: ', selectedDate)

   //Filtrar reservas por cancha para la vista móvil
   // const filteredReservations = selectedCourt
   //    ? reservations.filter((r) => r.courtId === selectedCourt)
   //    : reservations

   // Memoize the filtered reservations to avoid unnecessary re-renders
   const filteredReservations = useMemo(() => {
      return selectedCourt
         ? reservations.filter((reservation) => reservation.courtId === selectedCourt.id)
         : reservations
   }, [selectedCourt, reservations])

   return (
      <AppLayout>
         <div className="space-y-4">
            <Tabs defaultValue="grid">
               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
                  <CalendarHandler />
                  <ReservationsViewHandler />
               </div>

               {isMobile && <CourtHandlerMobile setSelectedCourt={setSelectedCourt} />}

               <TabsContent value="grid" className="mt-4">
                  <div className="rounded-lg border">
                     <ReservationsTable
                        selectedCourt={selectedCourt}
                        reservations={reservations}
                        setReservations={setReservations}
                     />
                  </div>
               </TabsContent>

               <TabsContent value="list" className="mt-4">
                  <div className="rounded-lg border">
                     <ReservationsList
                        reservations={reservations}
                        setReservations={setReservations}
                     />
                  </div>
               </TabsContent>
            </Tabs>
         </div>
      </AppLayout>
   )
}

export default Dashboard

// Función para generar reservas aleatorias
// function generateRandomReservations(date: Date) {
//    const newReservations = []
//    const reservationTypes = ['clase', 'partido', 'torneo', 'otro']
//    const names = [
//       'Juan Pérez',
//       'María López',
//       'Carlos Rodríguez',
//       'Ana Martínez',
//       'Luis González',
//    ]

//    for (let i = 0; i < 10; i++) {
//       const court = Math.floor(Math.random() * 4) + 1
//       const timeSlotIndex = Math.floor(Math.random() * timeSlots.length)
//       const type = reservationTypes[Math.floor(Math.random() * reservationTypes.length)]
//       const name = names[Math.floor(Math.random() * names.length)]

//       newReservations.push({
//          id: i + 1,
//          court,
//          timeSlot: timeSlots[timeSlotIndex],
//          name,
//          phone: `555-${Math.floor(1000 + Math.random() * 9000)}`,
//          type,
//       })
//    }

//    return newReservations
// }
