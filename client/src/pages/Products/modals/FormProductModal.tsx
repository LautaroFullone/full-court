import { useAppStore, useModalStore } from '@stores'
import { useBasicForm, useMobile } from '@hooks'
import { ProductFormData } from '@models'
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
   Input,
   Label,
} from '@shadcn'

const initialFormData: ProductFormData = {
   name: '',
   price: '',
   stock: 0,
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

   const isEditMode = modalFlags['edit-product']

   const { formData, handleChange, setFormData, resetForm } =
      useBasicForm<ProductFormData>(initialFormData)

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
   }, [isEditMode, selectedProduct])

   console.log('# product modal -> isEditMode', isEditMode)

   return (
      <Dialog
         open={modalFlags['new-product'] || modalFlags['edit-product']}
         onOpenChange={() => {
            if (isEditMode) {
               closeModal('edit-product')
               return dispatchSelectedProduct(null)
            }

            closeModal('new-product')
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
                  <Label htmlFor="name">Nombre del Producto</Label>
                  <Input
                     id="name"
                     placeholder="Ej: Café"
                     value={formData?.name}
                     onChange={(evt) => handleChange('name', evt.target.value)}
                  />
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <Label htmlFor="price">Precio ($)</Label>
                     <Input
                        id="price"
                        type="number"
                        placeholder="Ej: 150"
                        value={formData?.price}
                        onChange={(evt) => handleChange('price', evt.target.value)}
                     />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="stock">Stock</Label>
                     <Input
                        id="stock"
                        type="number"
                        placeholder="Ej: 20"
                        value={formData?.stock}
                        onChange={(evt) => handleChange('stock', evt.target.value)}
                     />
                  </div>
               </div>

               <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <select
                     id="category"
                     className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                     value={formData?.category}
                     onChange={(evt) => handleChange('category', evt.target.value)}
                  >
                     <option value="">Selecciona una categoría</option>
                     <option value="bebidas">Bebidas</option>
                     <option value="comidas">Comidas</option>
                     <option value="accesorios">Accesorios</option>
                     <option value="servicios">Servicios</option>
                  </select>
               </div>

               <div className="space-y-2">
                  <Label htmlFor="description">Descripción (opcional)</Label>
                  <Input
                     id="description"
                     placeholder="Ej: Café caliente en vaso de 200ml"
                  />
               </div>
            </div>

            <DialogFooter className={isMobile ? 'flex-col space-y-2' : ''}>
               <DialogClose asChild>
                  <Button variant="outline" className={isMobile ? 'w-full' : ''}>
                     Cancelar
                  </Button>
               </DialogClose>

               <Button type="submit" className={isMobile ? 'w-full' : ''}>
                  Guardar Producto
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
export default FormProductModal
