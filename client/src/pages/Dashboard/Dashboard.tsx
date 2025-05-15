/* eslint-disable react-hooks/exhaustive-deps */
import { useCalendar, useMobile, useMock } from '@hooks'
import { Tabs, TabsContent } from '@shadcn'
import { formatDateToString } from '@lib'
import { useMemo, useState } from 'react'
import { AppLayout } from '@shared'
import { Court } from '@models'
import {
   CalendarHandler,
   CourtHandlerMobile,
   NewReservationModal,
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
                        selectedDate={selectedDate}
                        selectedCourt={selectedCourt}
                        reservations={reservationsBySelectedDay}
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
         <NewReservationModal />
      </AppLayout>
   )
}

export default Dashboard
