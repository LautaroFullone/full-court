/* eslint-disable @typescript-eslint/no-explicit-any */
import ReservationDetailsModal from './ReservationDetailsModal'
import { Button, Dialog, DialogTrigger } from '@components'
import { reservationTypes } from '@models'
import { useState } from 'react'

interface ReservationsListProps {
   reservations: any[]
   setReservations: (reservations: any[]) => void
}

const ReservationsList: React.FC<ReservationsListProps> = ({
   reservations,
   setReservations,
}) => {
   const [openReservationId, setOpenReservationId] = useState<number | null>(null)

   function getReservationTypeClass(type: string) {
      const classes = {
         clase: 'bg-blue-100 text-blue-800',
         partido: 'bg-green-100 text-green-800',
         torneo: 'bg-purple-100 text-purple-800',
         otro: 'bg-amber-100 text-amber-800',
      }
      return classes[type as keyof typeof classes] || 'bg-gray-100 text-gray-800'
   }

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

   // const handleNewReservation = (timeSlot: string, court: number) => {
   //    console.log(`## handleNewReservation`, timeSlot, court)

   //    //    setSelectedTimeSlot(timeSlot)
   //    //    setSelectedCourt(court)
   //    //    setIsNewReservationOpen(true)
   // }

   return (
      <div className="p-4">
         <div className="grid grid-cols-3 md:grid-cols-5 font-medium border-b pb-2">
            <div>Horario</div>
            <div>Cancha</div>
            <div className="hidden md:block">Cliente</div>
            <div className="hidden md:block">Tipo</div>
            <div>Acciones</div>
         </div>
         <div className="divide-y">
            {reservations.map((reservation) => (
               <div
                  key={reservation.id}
                  className="grid grid-cols-3 md:grid-cols-5 py-3 items-center"
               >
                  <div className="text-sm md:text-base">{reservation.timeSlot}</div>
                  <div className="text-sm md:text-base">Cancha {reservation.court}</div>
                  <div className="hidden md:block">
                     <div>{reservation.name}</div>
                  </div>
                  <div className="hidden md:block">
                     <span
                        className={`text-xs px-2 py-0.5 rounded-full ${getReservationTypeClass(
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
                  <div className="flex space-x-2">
                     <Dialog>
                        <DialogTrigger asChild>
                           <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                 console.log('hola')
                                 //setSelectedReservation(reservation)}
                              }}
                           >
                              Detalles
                           </Button>
                        </DialogTrigger>
                        <ReservationDetailsModal
                           reservation={reservation}
                           onEdit={() => handleEditReservation(reservation.id)}
                           onCancel={() => handleCancelReservation(reservation.id)}
                           onManageConsumptions={() =>
                              handleManageConsumptions(reservation.id)
                           }
                           onUpdate={handleReservationUpdate}
                        />
                     </Dialog>
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}
export default ReservationsList
