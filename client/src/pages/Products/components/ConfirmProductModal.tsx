import { useDeleteProduct, useMobile } from '@hooks'
import { useAppStore, useModalStore } from '@stores'
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

const ConfirmProductModal = () => {
   const selectedProduct = useAppStore((state) => state.selectedProduct)
   const dispatchSelectedProduct = useAppStore(
      (state) => state.appActions.dispatchSelectedProduct
   )
   const modalFlags = useModalStore((state) => state.modalFlags)
   const closeModal = useModalStore((state) => state.modalActions.closeModal)

   const isMobile = useMobile()
   const { deleteProductMutate, isLoading } = useDeleteProduct()

   async function handleDeleteProduct() {
      if (selectedProduct) {
         await deleteProductMutate(selectedProduct.id)
         closeModal('confirm-delete-product')
         dispatchSelectedProduct(null)
      }
   }

   return (
      <Dialog
         open={modalFlags['confirm-delete-product']}
         onOpenChange={() => closeModal('confirm-delete-product')}
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
                  onClick={() => closeModal('confirm-delete-product')}
                  className="m-0"
               >
                  No, mantener producto
               </Button>

               <SaveButton
                  isLoading={isLoading}
                  model="product"
                  action="delete"
                  onClick={() => handleDeleteProduct()}
                  variant="destructive"
               />
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
export default ConfirmProductModal
