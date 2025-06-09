import { useFetchReservations, useMobile } from '@hooks'
import { Tabs, TabsContent } from '@shadcn'
import { formatDateToString } from '@lib'
import { Loader2 } from 'lucide-react'
import { useAppStore } from '@stores'
import { AppLayout } from '@shared'
import { useMemo } from 'react'
import {
   CalendarHandler,
   CourtHandlerMobile,
   ReservationsList,
   ReservationsTable,
   ReservationsViewHandler,
} from './components'
import {
   ConfirmReservationModal,
   DetailsReservationModal,
   FormReservationModal,
} from './modals'

const Dashboard = () => {
   // const { generateMockReservations } = useMock()
   const isMobile = useMobile()
   const selectedDate = useAppStore((state) => state.selectedDate)

   // const [reservations] = useState(generateMockReservations())

   const { reservations, isPending } = useFetchReservations(selectedDate)

   // const reservationsBySelectedDay = useMemo(() => {
   //    return reservations.filter(
   //       (reservation) => reservation.date === formatDateToString(selectedDate)
   //    )
   // }, [reservations, selectedDate])

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
                     {isPending ? (
                        <div className="h-[70vh] flex items-center justify-center p-8">
                           <div className="flex flex-col items-center justify-center">
                              <Loader2 className="h-8 w-8 animate-spin" />

                              <p className="text-sm text-muted-foreground mt-2">
                                 Cargando reservas...
                              </p>
                           </div>
                        </div>
                     ) : (
                        <ReservationsTable reservations={reservations} />
                     )}
                  </div>
               </TabsContent>

               <TabsContent value="list" className="mt-4">
                  <div className="rounded-lg border">
                     <ReservationsList reservations={reservations} />
                  </div>
               </TabsContent>
            </Tabs>
         </div>

         <FormReservationModal />
         <DetailsReservationModal />
         <ConfirmReservationModal />
      </AppLayout>
   )
}

export default Dashboard
