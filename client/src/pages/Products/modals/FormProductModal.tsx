import { useCreateProduct, useMobile, useUpdateProduct } from '@hooks'
import { CATEGORY_TYPES_VALUES, ProductFormData } from '@models'
import { SaveButton, InputForm, SelectForm } from '@shared'
import { useAppStore, useModalStore } from '@stores'
import { useEffect } from 'react'
import {
   Button,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@shadcn'
import { useForm } from 'react-hook-form'
import { productResolver } from '@lib'

const initialFormData: ProductFormData = {
   name: '',
   price: '',
   stock: '',
   category: '',
}

const FormProductModal = () => {
   const selectedProduct = useAppStore((state) => state.selectedProduct)
   const currentModal = useModalStore((state) => state.currentModal)
   const closeModal = useModalStore((state) => state.modalActions.closeModal)

   const isMobile = useMobile()
   const { createProductMutate, isLoading: isCreateLoading } = useCreateProduct()
   const { updateProductMutate, isLoading: isUpdateLoading } = useUpdateProduct()

   const {
      watch,
      setValue,
      register,
      trigger,
      reset: resetForm,
      handleSubmit: handleFormSubmit,
      formState: { errors, isValid },
   } = useForm<ProductFormData>({
      mode: 'onChange',
      resolver: productResolver,
      defaultValues: initialFormData,
   })

   const isEditMode = currentModal?.name === 'edit-product'
   const isLoading = isCreateLoading || isUpdateLoading

   useEffect(() => {
      if (isEditMode && selectedProduct) {
         resetForm({
            name: selectedProduct.name,
            price: String(selectedProduct.price),
            stock: String(selectedProduct.stock),
            category: selectedProduct.category,
         })
      }
      // eslint-disable-next-line
   }, [isEditMode, selectedProduct])

   async function onSubmit(formData: ProductFormData) {
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

      resetForm(initialFormData)
   }

   return (
      <DialogContent className="sm:max-w-2xl w-[95%] max-w-[95%]">
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
                  type="text"
                  placeholder="Ej: Café mediano"
                  disabled={isLoading}
                  register={register('name')}
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
                     placeholder="Ej: $2500"
                     disabled={isLoading}
                     register={register('price')}
                     errors={errors}
                  />
               </div>

               <div className="space-y-2">
                  <InputForm
                     label="Stock"
                     name="stock"
                     type="number"
                     placeholder="Ej: 25"
                     disabled={isLoading}
                     register={register('stock')}
                     errors={errors}
                  />
               </div>
            </div>

            <div className="space-y-2">
               <SelectForm
                  name="category"
                  label="Categoría"
                  value={watch('category')}
                  onChange={(value) => {
                     setValue('category', value)
                     trigger('category')
                  }}
                  errors={errors}
                  options={CATEGORY_TYPES_VALUES.map((cat) => ({
                     label: cat.charAt(0).toUpperCase() + cat.slice(1),
                     value: cat,
                  }))}
               />
            </div>
         </div>

         <DialogFooter className={isMobile ? 'flex-col space-y-2' : ''}>
            <DialogClose asChild>
               <Button
                  size="lg"
                  variant="outline"
                  disabled={isLoading}
                  className={isMobile ? 'w-full' : ''}
               >
                  Cancelar
               </Button>
            </DialogClose>

            <SaveButton
               model="product"
               isLoading={isLoading}
               onClick={handleFormSubmit(onSubmit)}
               disabled={!isValid || isLoading}
               action={isEditMode ? 'update' : 'create'}
            />
         </DialogFooter>
      </DialogContent>
   )
}
export default FormProductModal
