import { Court, Reservation, ReservationType, ShiftType } from '@models'
import { MoreHorizontal, Plus } from 'lucide-react'
import { useAppStore } from '@stores'
import {
   Button,
   Dialog,
   DialogTrigger,
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@shadcn'

interface ShiftProps {
   court: Court
   reservation: Reservation | undefined
   shiftSlot: ShiftType
}

const Shift: React.FC<ShiftProps> = ({ reservation, shiftSlot, court }) => {
   const {
      selectedReservation,
      selectedDate,
      appActions: { dispatchSelectedReservation },
   } = useAppStore()

   function getReservationTypeClass(type: ReservationType) {
      const classes = {
         clase: 'bg-blue-100 text-blue-800',
         partido: 'bg-green-100 text-green-800',
         torneo: 'bg-purple-100 text-purple-800',
         otro: 'bg-amber-100 text-amber-800',
      }
      return classes[type] || 'bg-gray-100 text-gray-800'
   }

   function isPastDate(date: Date) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return date < today
   }

   if (reservation) {
      return (
         <Dialog
            open={true} //openReservationId === reservation.id}
            onOpenChange={(open) => !open} //&& setOpenReservationId(null)}
         >
            <DialogTrigger asChild>
               <div
                  className="flex flex-col items-center justify-center cursor-pointer h-full w-full rounded-md transition-colors"
                  onClick={() => dispatchSelectedReservation(reservation)}
               >
                  <span className="font-medium text-sm text-center">
                     {reservation.owner}
                  </span>

                  <span
                     className={`text-xs px-2 py-0.5 rounded-full mt-1 ${getReservationTypeClass(
                        reservation.type
                     )}`}
                  >
                     {reservation.type}
                  </span>
               </div>
            </DialogTrigger>

            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button
                     className="absolute top-0 right-0 h-6 w-6"
                     variant="ghost"
                     size="icon"
                  >
                     <MoreHorizontal className="h-4 w-4" />
                  </Button>
               </DropdownMenuTrigger>

               <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => {}}>
                     Gestionar consumos
                  </DropdownMenuItem>

                  <DropdownMenuItem onSelect={() => {}}>Editar reserva</DropdownMenuItem>

                  <DropdownMenuItem onSelect={() => {}} className="text-destructive">
                     Cancelar reserva
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>

            {/* <ReservationDetailsModal /> */}
         </Dialog>
      )
   }

   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button
               variant="ghost"
               size="sm"
               className="w-full h-full flex items-center justify-center"
               onClick={() => {}}
               disabled={isPastDate(selectedDate)}
            >
               <Plus className="h-4 w-4 mr-1" />
               Reservar
            </Button>
         </DialogTrigger>

         {/* <NewReservationModal court={court} shiftSlot={shiftSlot} /> */}
      </Dialog>
   )
}
export default Shift
