import { useAppStore, useModalStore } from '@stores'
import { useMemo, useState } from 'react'
import ProductCard from './ProductCard'
import { useMobile } from '@hooks'
import { Product } from '@models'
import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from '@shadcn'

interface ProductsTableProps {
   products: Product[]
   searchTerm: string
}

const PRODUCTS_PER_PAGE = 10

const ProductsTable: React.FC<ProductsTableProps> = ({ products, searchTerm = '' }) => {
   console.log('ProductsTable')
   const isMobile = useMobile()
   const selectedCategory = useAppStore((state) => state.selectedCategory)

   const openModal = useModalStore((state) => state.modalActions.openModal)

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
      <>
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {currentProducts.map((product) => (
               <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={() => {
                     openModal({ name: 'new-product', selectedProduct: product })
                  }}
                  onDelete={() => openModal({ name: 'confirm-product', product })}
               />
            ))}
         </div>

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
                     Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                           <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={currentPage === page}
                           >
                              {page}
                           </PaginationLink>
                        </PaginationItem>
                     ))}

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

         {/* {productToEdit !== null && (
            <ProductEditV2
               product={products.find((p) => p.id === productToEdit) || {}}
               isOpen={productToEdit !== null}
               onClose={() => setProductToEdit(null)}
               onSave={handleSaveProduct}
            />
         )} */}

         {/* <AlertDialog
            open={productToDelete !== null}
            onOpenChange={() => setProductToDelete(null)}
         >
            <AlertDialogContent className="w-[95%] max-w-[95%] sm:w-auto sm:max-w-md">
               <AlertDialogHeader>
                  <AlertDialogTitle>
                     ¿Estás seguro de que quieres eliminar este producto?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                     Esta acción no se puede deshacer. Esto eliminará permanentemente el
                     producto del inventario.
                  </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter className={isMobile ? 'flex-col space-y-2' : ''}>
                  <AlertDialogCancel className={isMobile ? 'w-full' : ''}>
                     Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction
                     onClick={confirmDeleteProduct}
                     className={isMobile ? 'w-full' : ''}
                  >
                     Eliminar
                  </AlertDialogAction>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog> */}
      </>
   )
}
export default ProductsTable
