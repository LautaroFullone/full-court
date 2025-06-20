import { CalendarHandler, CourtHandlerMobile, ReservationsTable } from './components'
import { useFetchReservations, useMobile } from '@hooks'
import { Loader2 } from 'lucide-react'
import { useAppStore } from '@stores'
import { AppLayout } from '@shared'
import { Tabs } from '@shadcn'

const Dashboard = () => {
   const isMobile = useMobile()
   const selectedDate = useAppStore((state) => state.selectedDate)

   const { reservations, isPending } = useFetchReservations(selectedDate)

   return (
      <AppLayout>
         <div className="space-y-4">
            <Tabs defaultValue="grid">
               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
                  <CalendarHandler />
                  {/* <ReservationsViewHandler /> */}
               </div>

               {isMobile && <CourtHandlerMobile />}

               {/* <TabsContent value="grid" className="mt-4"> */}
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
               {/* </TabsContent> */}

               {/* <TabsContent value="list" className="mt-4">
                  <div className="rounded-lg border">
                     <ReservationsList reservations={reservations} />
                  </div>
               </TabsContent> */}
            </Tabs>
         </div>
      </AppLayout>
   )
}

export default Dashboard
