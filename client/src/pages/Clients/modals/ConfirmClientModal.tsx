import { useAppStore, useModalStore } from '@stores'
import { useDeleteClient, useMobile } from '@hooks'
import { SaveButton } from '@shared'
import {
   Button,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@shadcn'

const ConfirmClientModal = () => {
   const selectedClient = useAppStore((state) => state.selectedClient)
   const closeModal = useModalStore((state) => state.modalActions.closeModal)

   const isMobile = useMobile()
   const { deleteClientMutate, isLoading } = useDeleteClient()

   async function handleDeleteClient() {
      if (selectedClient) {
         await deleteClientMutate(selectedClient.id)
         closeModal('confirm-delete-client', true)
      }
   }

   return (
      <>
         <DialogHeader>
            <DialogTitle>
               ¿Estás seguro de que querés eliminar a {''}
               <span>{selectedClient?.name}</span> como cliente?
            </DialogTitle>

            <DialogDescription>
               Esta acción no se puede deshacer. Esto eliminará permanentemente la
               información del cliente.
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
               onClick={() => closeModal('confirm-delete-client')}
               className="m-0"
            >
               No, mantener cliente
            </Button>

            <SaveButton
               isLoading={isLoading}
               model="client"
               action="delete"
               onClick={() => handleDeleteClient()}
               variant="destructive"
            />
         </DialogFooter>
      </>
   )
}
export default ConfirmClientModal
