import { useBasicForm, useCreateProduct, useMobile, useUpdateProduct } from '@hooks'
import { useAppStore, useModalStore } from '@stores'
import { InputForm, SelectForm } from '@shared'
import { ProductFormData } from '@models'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import {
   Button,
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@shadcn'

const initialFormData: ProductFormData = {
   name: '',
   price: '',
   stock: '',
   category: '',
}

const FormProductModal: React.FC = () => {
   const selectedProduct = useAppStore((state) => state.selectedProduct)
   const modalFlags = useModalStore((state) => state.modalFlags)
   const closeModal = useModalStore((state) => state.modalActions.closeModal)
   const dispatchSelectedProduct = useAppStore(
      (state) => state.appActions.dispatchSelectedProduct
   )

   const isMobile = useMobile()
   const { createProductMutate, isLoading: isCreateLoading } = useCreateProduct()
   const { updateProductMutate, isLoading: isUpdateLoading } = useUpdateProduct()

   const { formData, handleChange, setFormData, resetForm, errors, isValid } =
      useBasicForm<ProductFormData>(initialFormData, 'product')

   const isEditMode = modalFlags['edit-product']
   const isLoading = isCreateLoading || isUpdateLoading

   useEffect(() => {
      if (isEditMode && selectedProduct) {
         setFormData({
            name: selectedProduct.name,
            price: selectedProduct.price.toString(),
            stock: selectedProduct.stock.toString(),
            category: selectedProduct.category,
         })
      } else {
         resetForm()
      }
      // eslint-disable-next-line
   }, [isEditMode])

   async function handleSubmit() {
      if (isEditMode && selectedProduct) {
         await updateProductMutate({
            productID: selectedProduct.id,
            productData: formData,
         })
         closeModal('edit-product')
      } else {
         await createProductMutate(formData)
         closeModal('create-product')
      }

      resetForm()
   }

   return (
      <Dialog
         open={modalFlags['create-product'] || modalFlags['edit-product']}
         onOpenChange={() => {
            if (isEditMode) {
               closeModal('edit-product')
               return dispatchSelectedProduct(null)
            }

            closeModal('create-product')
         }}
      >
         <DialogContent className="w-[95%] max-w-[95%] sm:w-auto sm:max-w-md">
            <DialogHeader>
               <DialogTitle>
                  {!selectedProduct ? 'Agregar nuevo' : 'Editar '} Producto
               </DialogTitle>

               <DialogDescription>
                  Completa la información del producto para{' '}
                  {!selectedProduct ? 'agregarlo al ' : 'actualizarlo en el '}
                  inventario.
               </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
               <div className="space-y-2">
                  <InputForm
                     label="Nombre del Producto"
                     name="name"
                     value={formData.name}
                     onChange={(evt) => handleChange('name', evt.target.value)}
                     placeholder="Ej: Café mediano"
                     disabled={isLoading}
                     errors={errors}
                  />
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <InputForm
                        label="Precio"
                        name="price"
                        value={formData.price}
                        onChange={(evt) => handleChange('price', evt.target.value)}
                        placeholder="Ej: $2500"
                        disabled={isLoading}
                        errors={errors}
                     />
                  </div>

                  <div className="space-y-2">
                     <InputForm
                        label="Stock"
                        name="stock"
                        value={formData.stock}
                        onChange={(evt) => handleChange('stock', evt.target.value)}
                        placeholder="Ej: 25"
                        disabled={isLoading}
                        errors={errors}
                     />
                  </div>
               </div>

               <div className="space-y-2">
                  <SelectForm
                     name="category"
                     label="Categoría"
                     value={formData.category}
                     onChange={(value) => handleChange('category', value)}
                     errors={errors}
                     options={[
                        { label: 'Bebidas', value: 'bebidas' },
                        { label: 'Comidas', value: 'comidas' },
                        { label: 'Accesorios', value: 'accesorios' },
                        { label: 'Servicios', value: 'servicios' },
                     ]}
                  />
               </div>
            </div>

            <DialogFooter className={isMobile ? 'flex-col space-y-2' : ''}>
               <DialogClose asChild>
                  <Button variant="outline" className={isMobile ? 'w-full' : ''}>
                     Cancelar
                  </Button>
               </DialogClose>

               <Button
                  size="lg"
                  disabled={!isValid}
                  onClick={handleSubmit}
                  className={isMobile ? 'w-full' : ''}
               >
                  {isLoading ? (
                     <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Guardando...
                     </>
                  ) : (
                     'Guardar Producto'
                  )}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
export default FormProductModal
