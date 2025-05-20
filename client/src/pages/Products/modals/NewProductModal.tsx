import { useModalStore } from '@stores'
import { useMobile } from '@hooks'
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

const NewProductModal = () => {
   const isMobile = useMobile()
   const {
      modalFlags,
      modalActions: { closeModal },
   } = useModalStore()

   return (
      <Dialog
         open={modalFlags['new-product']}
         onOpenChange={() => closeModal('new-product')}
      >
         <DialogContent className="w-[95%] max-w-[95%] sm:w-auto sm:max-w-md">
            <DialogHeader>
               <DialogTitle>Agregar Nuevo Producto</DialogTitle>

               <DialogDescription>
                  Completa la información del producto para agregarlo al inventario
               </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
               <div className="space-y-2">
                  <Label htmlFor="name">Nombre del Producto</Label>
                  <Input id="name" placeholder="Ej: Café" />
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <Label htmlFor="price">Precio ($)</Label>
                     <Input id="price" type="number" placeholder="Ej: 150" />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="stock">Stock</Label>
                     <Input id="stock" type="number" placeholder="Ej: 20" />
                  </div>
               </div>

               <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <select
                     id="category"
                     className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
export default NewProductModal
