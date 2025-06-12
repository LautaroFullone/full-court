import { ModalType, useModalStore } from '@stores'
import { ReactElement, useMemo } from 'react'
import { Dialog } from '@shadcn'
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
   const MODAL_COMPONENTS: Record<ModalType, ReactElement> = useMemo(
      () => ({
         'create-reservation': <FormReservationModal />,
         'edit-reservation': <FormReservationModal />,
         'details-reservation': <DetailsReservationModal />,
         'confirm-reservation': <ConfirmReservationModal />,

         'edit-product': <FormProductModal />,
         'create-product': <FormProductModal />,
         'confirm-delete-product': <ConfirmProductModal />,

         'create-client': <FormClientModal />,
         'edit-client': <FormClientModal />,
         'confirm-delete-client': <ConfirmClientModal />,
      }),
      []
   )

   const currentModal = useModalStore((state) => state.currentModal)
   const closeModal = useModalStore((state) => state.modalActions.closeModal)

   if (!currentModal) return null

   const { name } = currentModal

   const ModalComponent = MODAL_COMPONENTS[name]

   if (!ModalComponent) return null

   return (
      <Dialog open onOpenChange={(open) => open || closeModal(name)}>
         {ModalComponent}
      </Dialog>
   )
}

export default ModalRender
