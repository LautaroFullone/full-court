/* eslint-disable @typescript-eslint/no-explicit-any */
import ReservationDetailsModal from './ReservationDetailsModal'
import { shiftSlots, Court, reservationTypes, courts, Reservation } from '@models'
import { Loader2, MoreHorizontal, Plus } from 'lucide-react'
import { useMobile } from '@hooks'
import { useState } from 'react'
import {
   Button,
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@shadcn'
import Shift from './Shift'

interface ReservationsTableProps {
   reservations: Reservation[]
   selectedCourt: Court | undefined
   setReservations: (reservations: any[]) => void
}

const ReservationsTable: React.FC<ReservationsTableProps> = ({
   selectedCourt,
   reservations,
   setReservations,
}) => {
   const [openReservationId, setOpenReservationId] = useState<number | null>(null)

   const isMobile = useMobile()
   const isLoading = false

   function handleManageConsumptions(reservationId: string) {
      console.log('## handleManageConsumptions: ', reservationId)
   }

   const handleEditReservation = (reservationId: number) => {
      console.log('## handleEditReservation: ', reservationId)
      // En lugar de navegar, abrimos el modal de detalles
      //setOpenReservationId(reservationId)
   }

   const handleCancelReservation = (reservationId: number) => {
      console.log(`## handleEditReservation ${reservationId}`)
   }

   const handleReservationUpdate = (updatedReservation: any) => {
      // Actualizar la reserva en el estado local
      const updated = reservations.map((res) =>
         res.id === updatedReservation.id ? updatedReservation : res
      )
      setReservations(updated)
      // Mantener el modal abierto con los detalles actualizados
      setOpenReservationId(updatedReservation.id)
   }

   const handleNewReservation = (timeSlot: string, court: number) => {
      console.log(`## handleNewReservation`, timeSlot, court)

      //    setSelectedTimeSlot(timeSlot)
      //    setSelectedCourt(court)
      //    setIsNewReservationOpen(true)
   }

   return (
      <div className="rounded-lg border">
         {!isMobile && (
            <div className="grid grid-cols-5 border-b">
               <div className="p-3 font-medium">Horario</div>
               {courts.map((court) => (
                  <div className="p-3 font-medium text-center">{court.name}</div>
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
               {shiftSlots.map((timeSlot) => (
                  <div
                     key={timeSlot}
                     className={isMobile ? 'grid grid-cols-2' : 'grid grid-cols-5'}
                  >
                     <div className="p-3 border-r">{timeSlot}</div>

                     {isMobile
                        ? // Vista móvil: solo mostrar la cancha seleccionada
                          (() => {
                             const court = '1'
                             const reservation = reservations.find(
                                (r) => r.courtId === court && r.timeSlot === timeSlot
                             )
                             return (
                                <Shift
                                   court={court}
                                   timeSlot={timeSlot}
                                   reservation={reservation}
                                />
                             )
                          })()
                        : // Vista desktop: mostrar todas las canchas
                          [1, 2, 3, 4].map((court) => {
                             const reservation = reservations.find(
                                (r) => r.court === court && r.timeSlot === timeSlot
                             )
                             return (
                                <div
                                   key={`${timeSlot}-${court}`}
                                   className={`p-2 relative h-20 ${
                                      reservation
                                         ? 'bg-primary/5 hover:bg-primary/10'
                                         : 'hover:bg-muted/50'
                                   }`}
                                >
                                   {reservation ? (
                                      <Dialog
                                         open={openReservationId === reservation.id}
                                         onOpenChange={(open) =>
                                            !open && setOpenReservationId(null)
                                         }
                                      >
                                         <DialogTrigger asChild>
                                            <div
                                               className="flex flex-col items-center justify-center cursor-pointer h-full w-full rounded-md transition-colors"
                                               onClick={() =>
                                                  setOpenReservationId(reservation.id)
                                               }
                                            >
                                               <span className="font-medium text-sm text-center">
                                                  {reservation.name}
                                               </span>
                                               <span
                                                  className={`text-xs px-2 py-0.5 rounded-full mt-1 ${getReservationTypeClass(
                                                     reservation.type
                                                  )}`}
                                               >
                                                  {
                                                     reservationTypes[
                                                        reservation.type as keyof typeof reservationTypes
                                                     ]
                                                  }
                                               </span>
                                            </div>
                                         </DialogTrigger>
                                         <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                               <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  className="absolute top-0 right-0 h-6 w-6"
                                               >
                                                  <MoreHorizontal className="h-4 w-4" />
                                               </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                               <DropdownMenuItem
                                                  onSelect={() =>
                                                     handleManageConsumptions(
                                                        reservation.id
                                                     )
                                                  }
                                               >
                                                  Gestionar consumos
                                               </DropdownMenuItem>
                                               <DropdownMenuItem
                                                  onSelect={() =>
                                                     handleEditReservation(reservation.id)
                                                  }
                                               >
                                                  Editar reserva
                                               </DropdownMenuItem>
                                               <DropdownMenuItem
                                                  onSelect={() =>
                                                     handleCancelReservation(
                                                        reservation.id
                                                     )
                                                  }
                                                  className="text-destructive"
                                               >
                                                  Cancelar reserva
                                               </DropdownMenuItem>
                                            </DropdownMenuContent>
                                         </DropdownMenu>
                                         <ReservationDetailsModal
                                            reservation={reservation}
                                            onEdit={() =>
                                               handleEditReservation(reservation.id)
                                            }
                                            onCancel={() =>
                                               handleCancelReservation(reservation.id)
                                            }
                                            onManageConsumptions={() =>
                                               handleManageConsumptions(reservation.id)
                                            }
                                            onUpdate={handleReservationUpdate}
                                         />
                                      </Dialog>
                                   ) : (
                                      <Dialog>
                                         <DialogTrigger asChild>
                                            <Button
                                               variant="ghost"
                                               size="sm"
                                               className="w-full h-full flex items-center justify-center"
                                               onClick={() =>
                                                  handleNewReservation(timeSlot, court)
                                               }
                                            >
                                               <Plus className="h-4 w-4 mr-1" />
                                               Reservar
                                            </Button>
                                         </DialogTrigger>
                                         <DialogContent className="sm:max-w-[600px] w-[95%] max-w-[95%] sm:w-auto">
                                            <DialogHeader>
                                               <DialogTitle>Nueva Reserva</DialogTitle>
                                               <DialogDescription>
                                                  Cancha {court} - {timeSlot}
                                               </DialogDescription>
                                            </DialogHeader>
                                            {/* <NewReservationForm
                                       timeSlot={timeSlot}
                                       court={court}
                                       date={selectedDate}
                                    /> */}
                                         </DialogContent>
                                      </Dialog>
                                   )}
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
