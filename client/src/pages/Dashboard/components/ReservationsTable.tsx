import { SHIFT_VALUES, Court, Reservation, ShiftType } from '@models'
import { formatDateToString } from '@lib'
import { Loader2 } from 'lucide-react'
import { useMobile } from '@hooks'
import { COURTS } from '@config'
import Shift from './Shift'

interface ReservationsTableProps {
   reservations: Reservation[]
   selectedDate: Date
   selectedCourt: Court | undefined
}

const ReservationsTable: React.FC<ReservationsTableProps> = ({
   selectedCourt,
   reservations,
   selectedDate,
}) => {
   // const [openReservationId, setOpenReservationId] = useState<number | null>(null)

   const isMobile = useMobile()
   const isLoading = false

   function generateMobileShiftView(shiftSlot: ShiftType) {
      const hasReservation = reservations.find(
         (r) =>
            r.date == formatDateToString(selectedDate) &&
            r.courtId === selectedCourt?.id &&
            r.shift === shiftSlot
      )

      return (
         <Shift
            shiftSlot={shiftSlot}
            court={selectedCourt}
            reservation={hasReservation}
         />
      )
   }

   function generateDesktopShiftView(shiftSlot: ShiftType) {
      return COURTS.map((court) => {
         const hasReservation = reservations.find(
            (r) =>
               r.date == formatDateToString(selectedDate) &&
               r.courtId === court?.id &&
               r.shift === shiftSlot
         )

         return (
            <div
               key={`${'shift'}-${court.id}-${shiftSlot}`}
               className={`p-2 relative h-20 ${
                  hasReservation
                     ? 'bg-primary/5 hover:bg-primary/10'
                     : 'hover:bg-muted/50'
               }`}
            >
               <Shift shiftSlot={shiftSlot} court={court} reservation={hasReservation} />
            </div>
         )
      })
   }

   return (
      <div className="rounded-lg border">
         {/* CREACION DE LAS 5 COLUMNAS EN DESKTOP */}
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

         {/* CREACION LA UNICA COLUMNA EN MOBILE */}
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
               {/* SE RECORREN LOS SHIFT -> POR CADA TURNO SE COMPLETA PARA CADA CANCHA */}
               {SHIFT_VALUES.map((shiftSlot) => (
                  <div
                     key={`shift-${shiftSlot}`}
                     className={isMobile ? 'grid grid-cols-2' : 'grid grid-cols-5'}
                  >
                     <div className="p-3 border-r">{shiftSlot}</div>

                     {isMobile
                        ? generateMobileShiftView(shiftSlot)
                        : generateDesktopShiftView(shiftSlot)}
                  </div>
               ))}
            </div>
         )}
      </div>
   )
}

export default ReservationsTable
