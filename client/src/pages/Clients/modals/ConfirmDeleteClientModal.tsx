import { useAppStore, useModalStore } from '@stores'
import { useDeleteClient, useMobile } from '@hooks'
import { Loader2 } from 'lucide-react'
import {
   Button,
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@shadcn'

const ConfirmDeleteClientModal = () => {
   const selectedClient = useAppStore((state) => state.selectedClient)
   const dispatchSelectedClient = useAppStore(
      (state) => state.appActions.dispatchSelectedClient
   )
   const modalFlags = useModalStore((state) => state.modalFlags)
   const closeModal = useModalStore((state) => state.modalActions.closeModal)

   const isMobile = useMobile()
   const { deleteClientMutate, isLoading } = useDeleteClient()

   async function handleDelete() {
      await deleteClientMutate(selectedClient!.id)
      closeModal('confirm-delete-client')
      dispatchSelectedClient(null)
   }

   if (selectedClient) {
      return (
         <Dialog
            open={modalFlags['confirm-delete-client']}
            onOpenChange={() => closeModal('confirm-delete-client')}
         >
            <DialogContent className="w-[95%] max-w-[95%] sm:w-auto sm:max-w-md">
               <DialogHeader>
                  <DialogTitle>
                     ¿Estás seguro de que querés eliminar a {''}
                     <span>{selectedClient.name}</span> como cliente?
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

                  <Button
                     variant="destructive"
                     size="lg"
                     disabled={isLoading}
                     onClick={() => handleDelete}
                  >
                     {isLoading ? (
                        <>
                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                           Eliminando...
                        </>
                     ) : (
                        'Sí, eliminar cliente'
                     )}
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      )
   }
   return
}
export default ConfirmDeleteClientModal
