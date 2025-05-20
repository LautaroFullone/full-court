import { useAppStore, useModalStore } from '@stores'
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

const ConfirmProductModal = () => {
   const isMobile = useMobile()
   const { selectedProduct } = useAppStore()

   const {
      modalFlags,
      modalActions: { closeModal },
   } = useModalStore()

   function handleDeleteProduct() {
      console.log('Deleting product...')
   }

   return (
      <Dialog
         open={modalFlags['confirm-product']}
         onOpenChange={() => closeModal('confirm-product')}
      >
         <DialogContent className="w-[95%] max-w-[95%] sm:w-auto sm:max-w-md">
            <DialogHeader>
               <DialogTitle>
                  ¿Estás seguro de que querés eliminar el producto {''}
                  <span>"{selectedProduct?.name}"</span>?
               </DialogTitle>

               <DialogDescription>
                  Esta acción no se puede deshacer, se eliminará permanentemente el
                  producto.
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
                  onClick={() => closeModal('confirm-product')}
                  className="m-0"
               >
                  No, mantener producto
               </Button>

               <Button
                  variant="destructive"
                  size="lg"
                  onClick={() => handleDeleteProduct}
               >
                  Sí, eliminar producto
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
export default ConfirmProductModal
