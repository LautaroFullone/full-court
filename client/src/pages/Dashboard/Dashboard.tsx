/* eslint-disable react-hooks/exhaustive-deps */
import {
   ConfirmReservationModal,
   DetailsReservationModal,
   NewReservationModal,
} from './modals'
import { useMobile, useMock } from '@hooks'
import { Tabs, TabsContent } from '@shadcn'
import { formatDateToString } from '@lib'
import { useMemo, useState } from 'react'
import { useAppStore } from '@stores'
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
   const selectedDate = useAppStore((state) => state.selectedDate)
   const { generateMockReservations } = useMock()

   const [reservations] = useState(generateMockReservations())

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

               {isMobile && <CourtHandlerMobile />}

               <TabsContent value="grid" className="mt-4">
                  <div className="rounded-lg border">
                     <ReservationsTable reservations={reservationsBySelectedDay} />
                  </div>
               </TabsContent>

               <TabsContent value="list" className="mt-4">
                  <div className="rounded-lg border">
                     <ReservationsList reservations={reservationsBySelectedDay} />
                  </div>
               </TabsContent>
            </Tabs>
         </div>

         <NewReservationModal />
         <DetailsReservationModal />
         <ConfirmReservationModal />
      </AppLayout>
   )
}

export default Dashboard
