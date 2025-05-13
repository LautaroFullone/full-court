import { shiftTypeValues, Court, Reservation } from '@models'
import { Loader2 } from 'lucide-react'
import { useMobile } from '@hooks'
import { COURTS } from '@config'
import Shift from './Shift'

interface ReservationsTableProps {
   reservations: Reservation[]
   selectedCourt: Court | undefined
   setReservations: (reservations: Reservation[]) => void
}

const ReservationsTable: React.FC<ReservationsTableProps> = ({
   selectedCourt,
   reservations,
   //setReservations,
}) => {
   // const [openReservationId, setOpenReservationId] = useState<number | null>(null)

   const isMobile = useMobile()
   const isLoading = false

   // function handleManageConsumptions(reservationId: string) {
   //    console.log('## handleManageConsumptions: ', reservationId)
   // }

   // const handleEditReservation = (reservationId: number) => {
   //    console.log('## handleEditReservation: ', reservationId)
   //    // En lugar de navegar, abrimos el modal de detalles
   //    //setOpenReservationId(reservationId)
   // }

   // const handleCancelReservation = (reservationId: number) => {
   //    console.log(`## handleEditReservation ${reservationId}`)
   // }

   // const handleReservationUpdate = (updatedReservation: any) => {
   //    // Actualizar la reserva en el estado local
   //    const updated = reservations.map((res) =>
   //       res.id === updatedReservation.id ? updatedReservation : res
   //    )
   //    setReservations(updated)
   //    // Mantener el modal abierto con los detalles actualizados
   //    setOpenReservationId(updatedReservation.id)
   // }

   // const handleNewReservation = (timeSlot: string, court: number) => {
   //    console.log(`## handleNewReservation`, timeSlot, court)

   //    //    setSelectedTimeSlot(timeSlot)
   //    //    setSelectedCourt(court)
   //    //    setIsNewReservationOpen(true)
   // }

   return (
      <div className="rounded-lg border">
         {!isMobile && (
            <div className="grid grid-cols-5 border-b">
               <div className="p-3 font-medium">Horario</div>
               {COURTS.map((court) => (
                  <div key={`court-${court.id}`} className="p-3 font-medium text-center">
                     {court.name}
                  </div>
               ))}
            </div>
         )}

         {isMobile && (
            <div className="grid grid-cols-2 border-b">
               <div className="p-3 font-medium">Horario</div>
               <div className="p-3 font-medium text-center">
                  {selectedCourt?.name || 'Cancha X'}
               </div>
            </div>
         )}

         {isLoading ? (
            <div className="flex items-center justify-center h-96">
               <Loader2 className="h-8 w-8 animate-spin" />
            </div>
         ) : (
            <div className="divide-y">
               {shiftTypeValues.map((timeSlot) => (
                  <div
                     key={`time-${timeSlot}`}
                     className={isMobile ? 'grid grid-cols-2' : 'grid grid-cols-5'}
                  >
                     <div className="p-3 border-r">{timeSlot}</div>

                     {isMobile
                        ? // Vista móvil: solo mostrar la cancha seleccionada
                          (() => {
                             const court = 'cancha_1'
                             const reservation = reservations.find(
                                (r) => r.courtId === court && r.date === timeSlot
                             )
                             return (
                                <Shift
                                   courtId={court}
                                   timeSlot={timeSlot}
                                   reservation={reservation}
                                />
                             )
                          })()
                        : // Vista desktop: mostrar todas las canchas
                          COURTS.map((court) => {
                             const reservation = reservations.find(
                                (r) => r.courtId === court.id && r.shift === timeSlot
                             )
                             return (
                                <div
                                   key={`${timeSlot}-${court.id}`}
                                   className={`p-2 relative h-20 ${
                                      reservation
                                         ? 'bg-primary/5 hover:bg-primary/10'
                                         : 'hover:bg-muted/50'
                                   }`}
                                >
                                   <Shift
                                      court={court}
                                      shiftSlot={timeSlot}
                                      reservation={reservation}
                                   />
                                </div>
                             )
                          })}
                  </div>
               ))}
            </div>
         )}
      </div>
   )
}

export default ReservationsTable
