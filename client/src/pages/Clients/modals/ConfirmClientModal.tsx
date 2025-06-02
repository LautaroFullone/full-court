import { useAppStore, useModalStore } from '@stores'
import { useDeleteClient, useMobile } from '@hooks'
import { SaveButton } from '@shared'
import {
   Button,
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@shadcn'

const ConfirmClientModal = () => {
   const selectedClient = useAppStore((state) => state.selectedClient)
   const dispatchSelectedClient = useAppStore(
      (state) => state.appActions.dispatchSelectedClient
   )
   const modalFlags = useModalStore((state) => state.modalFlags)
   const closeModal = useModalStore((state) => state.modalActions.closeModal)

   const isMobile = useMobile()
   const { deleteClientMutate, isLoading } = useDeleteClient()

   async function handleDeleteClient() {
      if (selectedClient) {
         await deleteClientMutate(selectedClient.id)
         closeModal('confirm-delete-client')
         dispatchSelectedClient(null)
      }
   }

   return (
      <Dialog
         open={modalFlags['confirm-delete-client']}
         onOpenChange={() => closeModal('confirm-delete-client')}
      >
         <DialogContent className="w-[95%] max-w-[95%] sm:w-auto sm:max-w-md">
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
         </DialogContent>
      </Dialog>
   )
}
export default ConfirmClientModal
