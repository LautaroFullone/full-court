import { Dialog } from '@shadcn'
import { useModalStore } from '@stores'
import {
   ConfirmReservationModal,
   DetailsReservationModal,
   FormReservationModal,
} from '@pages'

const ModalRender = () => {
   const currentModal = useModalStore((state) => state.currentModal)
   const closeModal = useModalStore((state) => state.modalActions.closeModal)

   if (!currentModal) return null

   const { name } = currentModal

   return (
      <Dialog open onOpenChange={(open) => open || closeModal(name)}>
         {name === 'edit-reservation' && <FormReservationModal />}
         {name === 'create-reservation' && <FormReservationModal />}
         {name === 'details-reservation' && <DetailsReservationModal />}
         {name === 'confirm-reservation' && <ConfirmReservationModal />}
      </Dialog>
   )
}

export default ModalRender
