import { useFetchProducts, useMobile, useSearchFilter } from '@hooks'
import ProductsPagination from './components/ProductsPagination'
import { Loader2, Package, Plus, Search } from 'lucide-react'
import { CategoriesFilterHandler } from './components'
import { useAppStore, useModalStore } from '@stores'
import { Button, Input } from '@shadcn'
import { AppLayout } from '@shared'
import { useMemo } from 'react'

const Products = () => {
   const selectedCategory = useAppStore((state) => state.selectedCategory)
   const openModal = useModalStore((state) => state.modalActions.openModal)

   const isMobile = useMobile()
   const { products, isPending } = useFetchProducts()

   const {
      searchTerm,
      setSearchTerm,
      filteredValues: filteredProducts,
   } = useSearchFilter(products, ['name'])

   const filteredProductsByCategory = useMemo(
      () =>
         filteredProducts.filter(
            (product) =>
               selectedCategory === 'todos' || product.category === selectedCategory
         ),
      // eslint-disable-next-line
      [filteredProducts, selectedCategory, searchTerm]
   )

   return (
      <AppLayout>
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
                  value={searchTerm}
                  disabled={isPending}
                  onChange={(evt) => setSearchTerm(evt.target.value)}
               />
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
               <CategoriesFilterHandler disabled={isPending} />

               <Button
                  size="lg"
                  className="cursor-pointer"
                  onClick={() => openModal('create-product')}
               >
                  <Plus className="mr-2 h-4 w-4" />
                  Nuevo
               </Button>
            </div>
         </div>

         {isPending ? (
            <div className="h-[56vh] flex items-center justify-center p-8">
               <div className="flex flex-col items-center justify-center h-screen">
                  <Loader2 className="h-8 w-8 animate-spin" />

                  <p className="text-sm text-muted-foreground mt-2">
                     Cargando productos...
                  </p>
               </div>
            </div>
         ) : filteredProductsByCategory.length > 0 ? (
            <ProductsPagination
               itemsPerPage={isMobile ? 6 : 12}
               products={filteredProductsByCategory}
            />
         ) : (
            <div className="h-[56vh] flex items-center justify-center p-8 text-center">
               <div className="max-w-sm">
                  <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />

                  <h3 className="text-lg font-medium mb-2">
                     No hay productos registrados
                  </h3>

                  <p className="text-muted-foreground mb-4">
                     {searchTerm
                        ? `No hay productos que coincidan con "${searchTerm}". Intenta con otros términos de búsqueda.`
                        : selectedCategory !== 'todos'
                        ? 'No hay productos que coincidan con la categoría. Intenta con otros términos de búsqueda.'
                        : 'Comienza agregando tu primer producto para gestionar su stock y ventas.'}
                  </p>

                  <Button onClick={() => openModal('create-product')}>
                     <Plus className="mr-2 h-4 w-4" />
                     Nuevo Producto
                  </Button>
               </div>
            </div>
         )}
      </AppLayout>
   )
}

export default Products
