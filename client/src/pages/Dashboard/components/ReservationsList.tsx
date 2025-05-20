import { useStyles } from '@hooks'
import { Button, Dialog, DialogTrigger } from '@shadcn'
import { Reservation } from '@models'
import { COURTS } from '@config'
import { useModalStore } from '@stores'

interface ReservationsListProps {
   reservations: Reservation[]
}

const ReservationsList: React.FC<ReservationsListProps> = ({ reservations }) => {
   const {
      modalActions: { openModal },
   } = useModalStore()
   const { getReservationTypeClass } = useStyles()

   return (
      <div className="p-4">
         <div className="grid grid-cols-3 md:grid-cols-5 font-medium border-b pb-2">
            <div>Horario</div>
            <div>Cancha</div>
            <div className="hidden md:block">Cliente</div>
            <div className="hidden md:block text-center">Tipo</div>
            <div className="text-center">Acciones</div>
         </div>

         <div className="divide-y">
            {reservations.map((reservation) => {
               const court = COURTS.find((court) => court.id === reservation.courtId)
               const reservationClass = getReservationTypeClass(reservation.type)

               return (
                  <div
                     key={reservation.id}
                     className="grid grid-cols-3 md:grid-cols-5 py-3 items-center"
                  >
                     <div className="text-sm md:text-base">{reservation.shift}</div>
                     <div className="text-sm md:text-base">{court?.name}</div>

                     <div className="hidden md:block">
                        <div>{reservation.owner.name}</div>
                     </div>

                     <div className="hidden md:block text-center">
                        <span
                           className={`text-xs px-2 py-0.5 rounded-full capitalize ${reservationClass}`}
                        >
                           {reservation.type}
                        </span>
                     </div>

                     <div className="flex space-x-2 justify-center">
                        <Dialog>
                           <DialogTrigger asChild>
                              <Button
                                 variant="outline"
                                 size="sm"
                                 onClick={() =>
                                    openModal({
                                       name: 'details-reservation',
                                       reservation,
                                    })
                                 }
                              >
                                 Detalles
                              </Button>
                           </DialogTrigger>
                        </Dialog>
                     </div>
                  </div>
               )
            })}
         </div>
      </div>
   )
}
export default ReservationsList
