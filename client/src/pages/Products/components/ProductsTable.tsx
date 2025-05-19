import {
   Badge,
   Button,
   Card,
   CardContent,
   CardFooter,
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
   Input,
   Label,
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
   Tabs,
   TabsList,
   TabsTrigger,
} from '@shadcn'
import { Edit, Package, Plus, Search, Trash2 } from 'lucide-react'
import { useMobile } from '@hooks'
import { Product } from '@models'
import { useState } from 'react'

const categories = [
   { id: 'todos', name: 'Todos' },
   { id: 'bebidas', name: 'Bebidas' },
   { id: 'comidas', name: 'Comidas' },
   { id: 'accesorios', name: 'Accesorios' },
   { id: 'servicios', name: 'Servicios' },
]

interface ProductsTableProps {
   products: Product[]
}

const ProductsTable: React.FC<ProductsTableProps> = ({ products }) => {
   const [allProducts, setAllProducts] = useState(products)
   const [currentCategory, setCurrentCategory] = useState('todos')
   const [searchTerm, setSearchTerm] = useState('')
   const [currentPage, setCurrentPage] = useState(1)
   const [productToDelete, setProductToDelete] = useState<number | null>(null)
   const [productToEdit, setProductToEdit] = useState<number | null>(null)
   const isMobile = useMobile()
   const productsPerPage = 8

   const filteredProducts = allProducts
      .filter(
         (product) => currentCategory === 'todos' || product.category === currentCategory
      )
      .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

   const indexOfLastProduct = currentPage * productsPerPage
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage
   const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

   const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

   const handleCategoryChange = (category: string) => {
      setCurrentCategory(category)
      setCurrentPage(1)
   }

   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value)
      setCurrentPage(1)
   }

   const handleDeleteProduct = (productId: number) => {
      setProductToDelete(productId)
   }

   const confirmDeleteProduct = () => {
      if (productToDelete) {
         setAllProducts(allProducts.filter((product) => product.id !== productToDelete))
         setProductToDelete(null)
      }
   }

   const handleEditProduct = (productId: number) => {
      setProductToEdit(productId)
   }

   const handleSaveProduct = (updatedProduct: any) => {
      setAllProducts(
         allProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
         )
      )
      setProductToEdit(null)
   }

   const getCategoryColor = (category: string) => {
      switch (category) {
         case 'bebidas':
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
         case 'comidas':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
         case 'accesorios':
            return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
         case 'servicios':
            return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
         default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
      }
   }

   return (
      <>
         <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full sm:w-auto sm:flex-1">
               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
               <Input
                  type="search"
                  placeholder="Buscar productos..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleSearch}
               />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
               <Tabs
                  value={currentCategory}
                  onValueChange={handleCategoryChange}
                  className="w-full sm:w-auto"
               >
                  <TabsList className="w-full sm:w-auto overflow-x-auto flex whitespace-nowrap">
                     {categories.map((category) => (
                        <TabsTrigger
                           key={category.id}
                           value={category.id}
                           className="flex-1 sm:flex-none"
                        >
                           {category.name}
                        </TabsTrigger>
                     ))}
                  </TabsList>
               </Tabs>

               <Dialog>
                  <DialogTrigger asChild>
                     <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Nuevo
                     </Button>
                  </DialogTrigger>

                  <DialogContent className="w-[95%] max-w-[95%] sm:w-auto sm:max-w-md">
                     <DialogHeader>
                        <DialogTitle>Agregar Nuevo Producto</DialogTitle>
                        <DialogDescription>
                           Completa la información del producto para agregarlo al
                           inventario
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
            </div>
         </div>

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
                              <Badge className={`${getCategoryColor(product.category)}`}>
                                 {product.category}
                              </Badge>
                           </div>
                        </div>
                     </div>

                     <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold">${product.price}</div>
                        <Badge variant="outline">Stock:{product.stock}</Badge>
                     </div>
                  </CardContent>

                  {/* <CardFooter className="w-full grid grid-cols-2 gap-2"> */}
                  <CardFooter className="w-full grid grid-cols-1  lg:grid-cols-2 gap-2">
                     <Button variant="outline" size="lg" onClick={() => {}}>
                        <Edit className="" />
                        Editar
                     </Button>

                     <Button
                        variant="outline"
                        size="lg"
                        className="text-destructive hover:text-destructive"
                        onClick={() => {}}
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
                        onClick={() =>
                           setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                     />
                  </PaginationItem>
               </PaginationContent>
            </Pagination>
         </div>

         {/* {productToEdit !== null && (
            <ProductEditV2
               product={allProducts.find((p) => p.id === productToEdit) || {}}
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
