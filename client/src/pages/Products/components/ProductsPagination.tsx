import { useModalStore } from '@stores'
import ProductCard from './ProductCard'
import { useMobile } from '@hooks'
import { Product } from '@models'
import { useState } from 'react'
import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from '@shadcn'

interface ProductsPaginationProps {
   products: Product[]
   itemsPerPage: number
}

const ProductsPagination: React.FC<ProductsPaginationProps> = ({
   products,
   itemsPerPage,
}) => {
   const openModal = useModalStore((state) => state.modalActions.openModal)

   const [currentPage, setCurrentPage] = useState(1)
   const isMobile = useMobile()

   const totalPages = Math.ceil(products.length / itemsPerPage)
   const startIndex = (currentPage - 1) * itemsPerPage
   const currentItems = products.slice(startIndex, startIndex + itemsPerPage)

   return (
      <>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentItems.map((product) => (
               <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={() => openModal('edit-product', { product })}
                  onDelete={() => openModal('confirm-delete-product', { product })}
               />
            ))}
         </div>

         {products.length > 0 && totalPages > 1 && (
            <div className="mt-6 flex justify-center">
               <Pagination>
                  <PaginationContent>
                     <PaginationItem>
                        <PaginationPrevious
                           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                        />
                     </PaginationItem>
                  </PaginationContent>
               </Pagination>
            </div>
         )}
      </>
   )
}

export default ProductsPagination
