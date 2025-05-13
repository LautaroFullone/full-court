/* eslint-disable react-hooks/exhaustive-deps */
import { useCalendar, useMobile, useMock } from '@hooks'
import { Court, Reservation } from '@models'
import { Tabs, TabsContent } from '@shadcn'
import { formatDateToString } from '@lib'
import { useMemo, useState } from 'react'
import { AppLayout } from '@shared'
import {
   CalendarHandler,
   CourtHandlerMobile,
   ReservationsList,
   ReservationsTable,
   ReservationsViewHandler,
} from './components'

const Dashboard = () => {
   const isMobile = useMobile()
   const { selectedDate } = useCalendar()
   const { generateMockReservations } = useMock()

   const [selectedCourt, setSelectedCourt] = useState<Court>()
   const [reservations, setReservations] = useState(generateMockReservations())

   //Filtrar reservas por cancha para la vista móvil
   // const reservationsBySelectedDay = selectedCourt
   //    ? reservations.filter((r) => r.courtId === selectedCourt)
   //    : reservations

   // Memoize the filtered reservations to avoid unnecessary re-renders
   const reservationsBySelectedDay = useMemo(() => {
      return reservations.filter(
         (reservation) => reservation.date === formatDateToString(selectedDate)
      )
   }, [reservations, selectedDate])

   console.log('## Dashboard reservationsBySelectedDay: ', reservationsBySelectedDay)
   console.log('$$$ formatDateToString: ', formatDateToString(selectedDate))
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
                        reservations={reservationsBySelectedDay}
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
