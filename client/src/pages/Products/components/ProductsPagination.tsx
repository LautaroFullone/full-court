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
import { useState } from 'react'

interface ProductsPaginationProps {
   products: Product[]
}

const ProductsPagination: React.FC<ProductsPaginationProps> = ({ products }) => {
   const [currentPage, setCurrentPage] = useState(1)
   const isMobile = useMobile()

   const productsPerPage = 5
   const indexOfLastProduct = currentPage * productsPerPage
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage
   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

   const totalPages = Math.ceil(products.length / productsPerPage)

   return (
      <Pagination>
         <PaginationContent>
            <PaginationItem>
               <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
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
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
               />
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   )
}

export default ProductsPagination
