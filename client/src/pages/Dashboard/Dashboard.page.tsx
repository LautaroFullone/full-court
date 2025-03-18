import { AppLayout, Tabs, TabsContent, TabsList, TabsTrigger } from '@components'
import ReservationsViewHandler from './ReservationsViewHandler'
import ReservationsTable from './ReservationsTable'
import ReservationsList from './ReservationsList'
import CalendarHandler from './CalendarHandler'
import { Court, courts } from '@models'
import { useCalendar, useMobile } from '@hooks'
import { useState } from 'react'

const mockReservations = [
   {
      id: 1,
      court: 1,
      timeSlot: '8:00 - 9:30',
      name: 'Carlos Rodríguez',
      phone: '555-1234',
      type: 'clase',
   },
   {
      id: 2,
      court: 2,
      timeSlot: '9:30 - 11:00',
      name: 'Ana Martínez',
      phone: '555-5678',
      type: 'partido',
   },
   {
      id: 3,
      court: 3,
      timeSlot: '11:00 - 12:30',
      name: 'Luis González',
      phone: '555-9012',
      type: 'torneo',
   },
   {
      id: 4,
      court: 4,
      timeSlot: '12:30 - 14:00',
      name: 'María López',
      phone: '555-3456',
      type: 'clase',
   },
   {
      id: 5,
      court: 1,
      timeSlot: '14:00 - 15:30',
      name: 'Juan Pérez',
      phone: '555-7890',
      type: 'partido',
   },
   {
      id: 6,
      court: 2,
      timeSlot: '15:30 - 17:00',
      name: 'Sofía Ramírez',
      phone: '555-2345',
      type: 'otro',
   },
   {
      id: 7,
      court: 3,
      timeSlot: '17:00 - 18:30',
      name: 'Diego Fernández',
      phone: '555-6789',
      type: 'clase',
   },
   {
      id: 8,
      court: 4,
      timeSlot: '18:30 - 20:00',
      name: 'Laura Torres',
      phone: '555-0123',
      type: 'partido',
   },
   {
      id: 9,
      court: 1,
      timeSlot: '20:00 - 21:30',
      name: 'Pablo Sánchez',
      phone: '555-4567',
      type: 'torneo',
   },
   {
      id: 10,
      court: 2,
      timeSlot: '21:30 - 23:00',
      name: 'Valentina Díaz',
      phone: '555-8901',
      type: 'partido',
   },
]

const Dashboard = () => {
   const [selectedCourt, setSelectedCourt] = useState<Court>()
   const [reservations, setReservations] = useState(mockReservations)

   const isMobile = useMobile()
   const { currentDate } = useCalendar()
   console.log(currentDate)

   // Filtrar reservas por cancha para la vista móvil
   // const filteredReservations = selectedCourt
   //    ? reservations.filter((r) => r.court === selectedCourt)
   //    : reservations

   return (
      <AppLayout>
         <div className="space-y-4">
            <Tabs defaultValue="grid">
               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
                  <CalendarHandler />
                  <ReservationsViewHandler />
               </div>

               {isMobile && (
                  <div className="mt-4 flex justify-center">
                     <Tabs defaultValue="1" className="w-full">
                        <TabsList className="grid grid-cols-4 w-full">
                           {courts.map((court) => (
                              <TabsTrigger
                                 value={String(court.id)}
                                 onClick={() => setSelectedCourt(court)}
                              >
                                 {court.name}
                              </TabsTrigger>
                           ))}
                        </TabsList>
                     </Tabs>
                  </div>
               )}

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
