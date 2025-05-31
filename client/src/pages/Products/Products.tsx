import { CategoriesFilterHandler, ProductCard } from './components'
import ConfirmProductModal from './components/ConfirmProductModal'
import { useFetchProducts, useMobile } from '@hooks'
import { useAppStore, useModalStore } from '@stores'
import { FormProductModal } from './modals'
import { Loader2, Package, Plus, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { AppLayout } from '@shared'
import {
   Button,
   Input,
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from '@shadcn'

const PRODUCTS_PER_PAGE = 10

const Products = () => {
   const selectedCategory = useAppStore((state) => state.selectedCategory)
   const openModal = useModalStore((state) => state.modalActions.openModal)

   const isMobile = useMobile()
   const { products, isPending } = useFetchProducts()

   const [searchTerm, setSearchTerm] = useState<string>('')
   const [currentPage, setCurrentPage] = useState(1)

   const filteredProducts = useMemo(
      () =>
         products
            .filter(
               (product) =>
                  selectedCategory === 'todos' || product.category === selectedCategory
            )
            .filter((product) =>
               product.name.toLowerCase().includes(searchTerm?.toLowerCase())
            ),
      [products, selectedCategory, searchTerm]
   )

   const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE
   const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE
   const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
   const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)

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
                     value={searchTerm}
                     onChange={(evt) => setSearchTerm(evt.target.value)}
                  />
               </div>

               <div className="flex gap-2 w-full sm:w-auto">
                  <CategoriesFilterHandler />

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
               <div className="h-[60vh]  flex items-center justify-center p-8">
                  <div className="flex flex-col items-center justify-center h-screen">
                     <Loader2 className="h-8 w-8 animate-spin" />

                     <p className="text-sm text-muted-foreground mt-2">
                        Cargando productos...
                     </p>
                  </div>
               </div>
            ) : currentProducts.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentProducts.map((product) => (
                     <ProductCard
                        key={product.id}
                        product={product}
                        onEdit={() =>
                           openModal('edit-product', { selectedProduct: product })
                        }
                        onDelete={() => openModal('confirm-delete-product', { product })}
                     />
                  ))}
               </div>
            ) : (
               <div className="flex items-center justify-center p-8 text-center">
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

                     <Button onClick={() => openModal('create-client')}>
                        <Plus className="mr-2 h-4 w-4" />
                        Nuevo Cliente
                     </Button>
                  </div>
               </div>
            )}

            <div className="mt-6 flex justify-center">
               <Pagination>
                  <PaginationContent>
                     <PaginationItem>
                        <PaginationPrevious
                           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                           // disabled={currentPage === 1}
                        />
                     </PaginationItem>

                     {!isMobile &&
                        Array.from({ length: totalPages }, (_, i) => i + 1).map(
                           (page) => (
                              <PaginationItem key={page}>
                                 <PaginationLink
                                    onClick={() => setCurrentPage(page)}
                                    isActive={currentPage === page}
                                 >
                                    {page}
                                 </PaginationLink>
                              </PaginationItem>
                           )
                        )}

                     {isMobile && (
                        <PaginationItem>
                           <span className="text-sm">
                              Página {currentPage} de {totalPages}
                           </span>
                        </PaginationItem>
                     )}

                     <PaginationItem>
                        <PaginationNext
                           onClick={() =>
                              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                           }
                           // disabled={currentPage === totalPages}
                        />
                     </PaginationItem>
                  </PaginationContent>
               </Pagination>
            </div>

            <FormProductModal />
            <ConfirmProductModal />
         </div>
      </AppLayout>
   )
}

export default Products
