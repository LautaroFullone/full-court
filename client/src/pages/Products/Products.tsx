import { Button, Input, Tabs, TabsList, TabsTrigger } from '@shadcn'
import { ProductsTable } from './components'
import { Plus, Search } from 'lucide-react'
import { NewProductModal } from './modals'
import { AppLayout } from '@shared'
import { Product } from '@models'
import { useBasicForm } from '@hooks'
import { useAppStore, useModalStore } from '@stores'
import ConfirmProductModal from './components/ConfirmProductModal'

// Datos de ejemplo para los productos
const allProducts: Product[] = [
   { id: '1', name: 'Café', price: '2500', category: 'bebidas', stock: 25 },
   { id: '2', name: 'Agua mineral', price: '1350', category: 'bebidas', stock: 30 },
   { id: '3', name: 'Gaseosa', price: '3200', category: 'bebidas', stock: 20 },
   { id: '4', name: 'Grip', price: '4000', category: 'accesorios', stock: 15 },
   {
      id: '5',
      name: 'Pelota (pack x3)',
      price: '15000',
      category: 'accesorios',
      stock: 10,
   },
   {
      id: '6',
      name: 'Alquiler de raqueta',
      price: '4500',
      category: 'servicios',
      stock: 8,
   },
   { id: '7', name: 'Sandwich', price: '1500', category: 'comidas', stock: 12 },
   { id: '8', name: 'Barra energética', price: '1000', category: 'comidas', stock: 18 },
   { id: '9', name: 'Muñequera', price: '8000', category: 'accesorios', stock: 7 },
   { id: '10', name: 'Visera', price: '7000', category: 'accesorios', stock: 5 },
   { id: '11', name: 'Cerveza', price: '4400', category: 'bebidas', stock: 22 },
   { id: '12', name: 'Jugo', price: '3500', category: 'bebidas', stock: 15 },
   { id: '13', name: 'Ensalada', price: '3500', category: 'comidas', stock: 8 },
   { id: '14', name: 'Clase particular', price: '1200', category: 'servicios', stock: 5 },
]

const categories = [
   { id: 'todos', name: 'Todos' },
   { id: 'bebidas', name: 'Bebidas' },
   { id: 'comidas', name: 'Comidas' },
   { id: 'accesorios', name: 'Accesorios' },
   { id: 'servicios', name: 'Servicios' },
]

const initialFormData = {
   searchTerm: '',
}

export default function ProductsPage() {
   // const {  modalActions: { openModal }} = useModalStore()
   const openModal = useModalStore((state) => state.modalActions.openModal)
   const { formData, handleChange } = useBasicForm(initialFormData)

   return (
      <AppLayout>
         <div className="px-4 py-6">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
               <div>
                  <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
                  <p className="text-muted-foreground">
                     Gestioná el inventario de productos y servicios
                  </p>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
               <div className="relative w-full sm:w-auto sm:flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                     type="search"
                     placeholder="Buscar productos..."
                     className="pl-8"
                     value={formData.searchTerm}
                     onChange={(evt) => handleChange('searchTerm', evt.target.value)}
                  />
               </div>

               <div className="flex gap-2 w-full sm:w-auto">
                  <Tabs
                     value={selectedCategory}
                     onValueChange={(value) => dispatchSelectedCategory(value)}
                     className="w-full sm:w-auto flex "
                  >
                     <TabsList className="w-full h-full sm:w-auto overflow-x-auto flex whitespace-nowrap">
                        {categories.map((category) => (
                           <TabsTrigger
                              key={`category-${category.id}`}
                              value={category.id}
                              className="flex-1 sm:flex-none cursor-pointer"
                           >
                              {category.name}
                           </TabsTrigger>
                        ))}
                     </TabsList>
                  </Tabs>

                  <Button
                     size="lg"
                     className="cursor-pointer"
                     onClick={() => openModal({ name: 'new-product' })}
                  >
                     <Plus className="mr-2 h-4 w-4" />
                     Nuevo
                  </Button>
               </div>
            </div>

            <ProductsTable products={allProducts} searchTerm={formData.searchTerm} />
            <NewProductModal />
            <ConfirmProductModal />
         </div>
      </AppLayout>
   )
}
