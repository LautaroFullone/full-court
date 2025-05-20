import { Court, Reservation, ShiftType } from '@models'
import { useAppStore, useModalStore } from '@stores'
import { MoreHorizontal, Plus } from 'lucide-react'
import { useStyles } from '@hooks'
import {
   Button,
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

const Shift: React.FC<ShiftProps> = ({ court, shiftSlot, reservation }) => {
   const { selectedDate } = useAppStore()
   const { modalActions } = useModalStore()
   const { getReservationTypeClass } = useStyles()

   function isPastDate(date: Date) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return date < today
   }

   if (reservation) {
      return (
         <div className="h-full">
            <div
               className="flex flex-col items-center justify-center cursor-pointer h-full w-full rounded-md transition-colors"
               onClick={() => {
                  modalActions.openModal({
                     name: 'details-reservation',
                     reservation,
                  })
               }}
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
         </div>
      )
   }

   return (
      <Button
         variant="ghost"
         size="sm"
         className="w-full h-full flex items-center justify-center"
         onClick={() => {
            modalActions.openModal({
               name: 'new-reservation',
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
