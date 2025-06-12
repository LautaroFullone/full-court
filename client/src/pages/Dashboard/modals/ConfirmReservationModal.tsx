import { useDeleteReservation, useMobile } from '@hooks'
import { useAppStore, useModalStore } from '@stores'
import { SaveButton } from '@shared'
import {
   Button,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@shadcn'

const ConfirmReservationModal = () => {
   const selectedReservation = useAppStore((state) => state.selectedReservation)
   const dispatchSelectedReservation = useAppStore(
      (state) => state.appActions.dispatchSelectedReservation
   )
   const closeModal = useModalStore((state) => state.modalActions.closeModal)

   const isMobile = useMobile()
   const { deleteReservationMutate, isLoading } = useDeleteReservation()

   async function handleDeleteReservation() {
      if (selectedReservation) {
         await deleteReservationMutate(selectedReservation.id)
         closeModal('confirm-reservation')
         dispatchSelectedReservation(null)
      }
   }

   return (
      <DialogContent className="sm:max-w-md w-[95%] max-w-[95%]">
         <DialogHeader>
            <DialogTitle>¿Estás seguro de que quieres cancelar esta reserva?</DialogTitle>

            <DialogDescription>
               Esta acción no se puede deshacer. Esto eliminará permanentemente la reserva
               y todos los datos asociados.
            </DialogDescription>
         </DialogHeader>

         <DialogFooter
            className={`w-full ${
               isMobile ? 'flex flex-col space-y-2' : 'grid grid-cols-2 gap-2'
            }`}
         >
            <Button
               variant="outline"
               size="lg"
               onClick={() => closeModal('confirm-reservation')}
               className="m-0"
            >
               No, mantener reserva
            </Button>

            <SaveButton
               isLoading={isLoading}
               model="reservation"
               action="cancel"
               onClick={() => handleDeleteReservation()}
               variant="destructive"
            />
         </DialogFooter>
      </DialogContent>
   )
}
export default ConfirmReservationModal
