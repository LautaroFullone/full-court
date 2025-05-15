import { Court, Reservation, ShiftType } from '@models'
import { MoreHorizontal, Plus } from 'lucide-react'
import { useAppStore, useModalStore } from '@stores'
import {
   Button,
   Dialog,
   DialogTrigger,
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@shadcn'
import { useStyles } from '@hooks'
import NewReservationModal from './NewReservationModal'

interface ShiftProps {
   court: Court | undefined
   reservation: Reservation | undefined
   shiftSlot: ShiftType
}

const Shift: React.FC<ShiftProps> = ({ court, shiftSlot, reservation }) => {
   const { getReservationTypeClass } = useStyles()
   const {
      selectedDate,
      appActions: { dispatchSelectedReservation },
   } = useAppStore()
   const { modalActions } = useModalStore()

   function isPastDate(date: Date) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return date < today
   }

   if (reservation) {
      return (
         <Dialog
            open={false} //openReservationId === reservation.id}
            onOpenChange={(open) => !open} //&& setOpenReservationId(null)}
         >
            <DialogTrigger asChild>
               <div
                  className="flex flex-col items-center justify-center cursor-pointer h-full w-full rounded-md transition-colors"
                  onClick={() => dispatchSelectedReservation(reservation)}
               >
                  <span className="font-medium text-sm text-center">
                     {reservation.owner.name}
                  </span>

                  <span
                     className={`text-xs px-2 py-0.5 rounded-full mt-1 capitalize ${getReservationTypeClass(
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
      <Button
         variant="ghost"
         size="sm"
         className="w-full h-full flex items-center justify-center"
         onClick={() => {
            modalActions.openModal({
               modal: 'new-reservation',
               selectedCourt: court,
               selectedShift: shiftSlot,
            })
         }}
         disabled={isPastDate(selectedDate)}
      >
         <Plus className="h-4 w-4 mr-1" />
         Reservar
      </Button>
   )
}
export default Shift
