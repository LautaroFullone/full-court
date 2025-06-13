import { ModalType, useModalStore } from '@stores'
import { Dialog, DialogContent } from '@shadcn'
import {
   ConfirmClientModal,
   ConfirmProductModal,
   ConfirmReservationModal,
   DetailsReservationModal,
   FormClientModal,
   FormProductModal,
   FormReservationModal,
} from '@pages'

const ModalRender = () => {
   const MODAL_COMPONENTS: Record<ModalType, React.FC> = {
      'create-reservation': FormReservationModal,
      'edit-reservation': FormReservationModal,
      'details-reservation': DetailsReservationModal,
      'confirm-reservation': ConfirmReservationModal,

      'edit-product': FormProductModal,
      'create-product': FormProductModal,
      'confirm-delete-product': ConfirmProductModal,

      'create-client': FormClientModal,
      'edit-client': FormClientModal,
      'confirm-delete-client': ConfirmClientModal,
   }

   const currentModal = useModalStore((state) => state.currentModal)
   const closeModal = useModalStore((state) => state.modalActions.closeModal)

   if (!currentModal) return null

   const { name } = currentModal
   const ModalComponent = MODAL_COMPONENTS[name]
   const contentWidth = name.includes('confirm') ? 'sm:max-w-md' : 'sm:max-w-2xl'

   return (
      <Dialog open onOpenChange={(open) => open || closeModal(name)}>
         <DialogContent className={`${contentWidth} w-[95%] max-w-[95%]`}>
            <ModalComponent />
         </DialogContent>
      </Dialog>
   )
}

export default ModalRender
