import { useBasicForm, useCreateProduct, useMobile, useUpdateProduct } from '@hooks'
import { CATEGORY_TYPES_VALUES, ProductFormData } from '@models'
import { SaveButton, InputForm, SelectForm } from '@shared'
import { useAppStore, useModalStore } from '@stores'
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
            price: selectedProduct.price,
            stock: selectedProduct.stock,
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
               resetForm()
               return dispatchSelectedProduct(null)
            }

            closeModal('create-product')
            resetForm()
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
                        isCurrency
                        label="Precio"
                        name="price"
                        type="number"
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
                        type="number"
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
                     options={CATEGORY_TYPES_VALUES.map((cat) => ({
                        label: String(cat).charAt(0).toUpperCase() + String(cat).slice(1),
                        value: cat,
                     }))}
                  />
               </div>
            </div>

            <DialogFooter className={isMobile ? 'flex-col space-y-2' : ''}>
               <DialogClose asChild>
                  <Button
                     variant="outline"
                     size="lg"
                     className={isMobile ? 'w-full' : ''}
                  >
                     Cancelar
                  </Button>
               </DialogClose>

               <SaveButton
                  model="product"
                  isLoading={isLoading}
                  onClick={handleSubmit}
                  disabled={!isValid}
               />
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
export default FormProductModal
