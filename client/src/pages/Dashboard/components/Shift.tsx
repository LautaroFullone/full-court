import { Court, Reservation, ShiftType } from '@models'
import { useAppStore, useModalStore } from '@stores'
import { MoreHorizontal, Plus } from 'lucide-react'
import { useStyles } from '@hooks'
import { formatStringToDate } from '@lib'
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
   const selectedDate = useAppStore((state) => state.selectedDate)
   const openModal = useModalStore((state) => state.modalActions.openModal)

   const { getReservationTypeClass } = useStyles()

   function isPastDate(dateStr: string) {
      const today = new Date()
      const date = formatStringToDate(dateStr)

      today.setHours(0, 0, 0, 0)
      return date < today
   }

   if (reservation) {
      return (
         <div className="h-full">
            <div
               className="flex flex-col items-center justify-center cursor-pointer h-full w-full rounded-md transition-colors"
               onClick={() => openModal('details-reservation', { reservation })}
            >
               <span className="font-medium text-sm text-center">
                  {reservation?.owner.name}
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
                  <DropdownMenuItem className="cursor-pointer" onSelect={() => {}}>
                     Gestionar consumos
                  </DropdownMenuItem>

                  <DropdownMenuItem
                     className="cursor-pointer"
                     onSelect={() => {
                        Promise.resolve().then(
                           () => openModal('edit-reservation', { reservation }) //used to fix focus radix error
                        )
                     }}
                  >
                     Editar reserva
                  </DropdownMenuItem>

                  <DropdownMenuItem
                     onSelect={() => {
                        Promise.resolve().then(() =>
                           openModal('confirm-reservation', { reservation })
                        )
                     }}
                     className="text-destructive hover:text-destructive cursor-pointer"
                  >
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
            openModal('create-reservation', {
               court,
               shift: shiftSlot,
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
