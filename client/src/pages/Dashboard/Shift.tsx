import ReservationDetailsModal from './ReservationDetailsModal'
import NewReservationModal from './NewReservationModal'
import { Court, Reservation, ReservationType } from '@models'
import { MoreHorizontal, Plus } from 'lucide-react'
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
   courtId: Court['id']
   timeSlot: string
   reservation: Reservation | undefined
}

const Shift: React.FC<ShiftProps> = ({ courtId, timeSlot, reservation }) => {
   function getReservationTypeClass(type: ReservationType) {
      const classes = {
         clase: 'bg-blue-100 text-blue-800',
         partido: 'bg-green-100 text-green-800',
         torneo: 'bg-purple-100 text-purple-800',
         otro: 'bg-amber-100 text-amber-800',
      }
      return classes[type] || 'bg-gray-100 text-gray-800'
   }

   return (
      <div
         key={`${timeSlot}-${courtId}`}
         className={`p-2 relative h-20 ${
            reservation ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-muted/50'
         }`}
      >
         {reservation ? (
            <Dialog
               open={false} //openReservationId === reservation.id}
               onOpenChange={(open) => !open} //&& setOpenReservationId(null)}
            >
               <DialogTrigger asChild>
                  <div
                     className="flex flex-col items-center justify-center cursor-pointer h-full w-full rounded-md transition-colors"
                     onClick={() => {
                        //setOpenReservationId(reservation.id)
                     }}
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

                     <DropdownMenuItem onSelect={() => {}}>
                        Editar reserva
                     </DropdownMenuItem>

                     <DropdownMenuItem onSelect={() => {}} className="text-destructive">
                        Cancelar reserva
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>

               <ReservationDetailsModal
                  reservation={reservation}
                  onEdit={() => {}}
                  onCancel={() => {}}
                  onManageConsumptions={() => {}}
                  onUpdate={() => {}}
               />
            </Dialog>
         ) : (
            <Dialog>
               <DialogTrigger asChild>
                  <Button
                     variant="ghost"
                     size="sm"
                     className="w-full h-full flex items-center justify-center"
                     onClick={() => {}}
                  >
                     <Plus className="h-4 w-4 mr-1" />
                     Reservar
                  </Button>
               </DialogTrigger>

               <NewReservationModal />
            </Dialog>
         )}
      </div>
   )
}
export default Shift
