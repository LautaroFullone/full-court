import { Loader2, MoreHorizontal, Plus } from 'lucide-react'
import { shiftSlots } from '@models'
import { useMobile } from '@hooks'
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
} from '@components'
import ReservationDetailsModal from './ReservationDetailsModal'

interface ReservationsTableProps {}

const ReservationsTable = () => {
   const isMobile = useMobile()
   const isLoading = true

   return (
      <div className="rounded-lg border">
         {!isMobile && (
            <div className="grid grid-cols-5 border-b">
               <div className="p-3 font-medium">Horario</div>
               <div className="p-3 font-medium text-center">Cancha 1</div>
               <div className="p-3 font-medium text-center">Cancha 2</div>
               <div className="p-3 font-medium text-center">Cancha 3</div>
               <div className="p-3 font-medium text-center">Cancha 4</div>
            </div>
         )}

         {isMobile && (
            <div className="grid grid-cols-2 border-b">
               <div className="p-3 font-medium">Horario</div>
               <div className="p-3 font-medium text-center">
                  Cancha {selectedCourtFilter || 1}
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
                             const court = selectedCourtFilter || 1
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
                                            <NewReservationForm
                                               timeSlot={timeSlot}
                                               court={court}
                                               date={currentDate}
                                            />
                                         </DialogContent>
                                      </Dialog>
                                   )}
                                </div>
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
                                       date={currentDate}
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
