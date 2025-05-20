import { useModalStore } from '@stores'
import { useMobile } from '@hooks'
import {
   Button,
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@shadcn'

const ConfirmReservationModal = () => {
   const isMobile = useMobile()

   const modalFlags = useModalStore((state) => state.modalFlags)
   const closeModal = useModalStore((state) => state.modalActions.closeModal)

   function handleDeleteReservation() {
      console.log('Deleting reservation...')
   }

   return (
      <Dialog
         open={modalFlags['confirm-reservation']}
         onOpenChange={() => closeModal('confirm-reservation')}
      >
         <DialogContent className="w-[95%] max-w-[95%] sm:w-auto sm:max-w-md">
            <DialogHeader>
               <DialogTitle>
                  ¿Estás seguro de que quieres cancelar esta reserva?
               </DialogTitle>

               <DialogDescription>
                  Esta acción no se puede deshacer. Esto eliminará permanentemente la
                  reserva y todos los datos asociados.
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

               <Button
                  variant="destructive"
                  size="lg"
                  onClick={() => handleDeleteReservation}
               >
                  Sí, cancelar reserva
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
export default ConfirmReservationModal
