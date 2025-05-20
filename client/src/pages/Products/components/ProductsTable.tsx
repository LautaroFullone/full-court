import { Edit, Package, Trash2 } from 'lucide-react'
import { useMobile, useStyles } from '@hooks'
import { useAppStore, useModalStore } from '@stores'
import { Product } from '@models'
import { useCallback, useMemo, useState } from 'react'
import {
   Badge,
   Button,
   Card,
   CardContent,
   CardFooter,
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
   const isMobile = useMobile()
   const selectedCategory = useAppStore((state) => state.selectedCategory)
   const { getCategoryColorClass } = useStyles()

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
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {currentProducts.map((product) => (
               <Card
                  key={product.id}
                  content="center"
                  className=" overflow-hidden rounded-2xl shadow-md border justify-center"
               >
                  <CardContent className="px-6">
                     <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                           <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                              <Package className="h-5 w-5 text-primary" />
                           </div>
                           <div>
                              <h3 className="font-medium">{product.name}</h3>
                              <Badge
                                 className={`${getCategoryColorClass(
                                    product.category
                                 )} capitalize`}
                              >
                                 {product.category}
                              </Badge>
                           </div>
                        </div>
                     </div>

                     <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold">
                           ${Number(product.price).toLocaleString('es-AR')}
                        </div>
                        <Badge variant="outline">Stock: {product.stock}</Badge>
                     </div>
                  </CardContent>

                  <CardFooter className="w-full grid grid-cols-1  lg:grid-cols-2 gap-2">
                     <Button
                        variant="outline"
                        size="lg"
                        onClick={() => {
                           openModal({ name: 'new-product', selectedProduct: product })
                        }}
                     >
                        <Edit className="" />
                        Editar
                     </Button>

                     <Button
                        variant="outline"
                        size="lg"
                        className="text-destructive hover:text-destructive"
                        onClick={() => openModal({ name: 'confirm-product', product })}
                     >
                        <Trash2 className="" />
                        Eliminar
                     </Button>
                  </CardFooter>
               </Card>
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
