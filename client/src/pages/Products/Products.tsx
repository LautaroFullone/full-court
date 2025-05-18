import { useMobile } from '@hooks'
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   Button,
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
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
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
   Tabs,
   TabsList,
   TabsTrigger,
} from '@shadcn'
import { ArrowLeft, Edit, Plus, Search, Table, Trash2 } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

// Datos de ejemplo para los productos
const allProducts = [
   { id: 1, name: 'Café', price: 150, category: 'bebidas', stock: 25 },
   { id: 2, name: 'Agua mineral', price: 120, category: 'bebidas', stock: 30 },
   { id: 3, name: 'Gaseosa', price: 200, category: 'bebidas', stock: 20 },
   { id: 4, name: 'Grip', price: 800, category: 'accesorios', stock: 15 },
   { id: 5, name: 'Pelota (pack x3)', price: 1500, category: 'accesorios', stock: 10 },
   { id: 6, name: 'Alquiler de raqueta', price: 500, category: 'servicios', stock: 8 },
   { id: 7, name: 'Sandwich', price: 350, category: 'comidas', stock: 12 },
   { id: 8, name: 'Barra energética', price: 180, category: 'comidas', stock: 18 },
   { id: 9, name: 'Muñequera', price: 450, category: 'accesorios', stock: 7 },
   { id: 10, name: 'Visera', price: 600, category: 'accesorios', stock: 5 },
   // Agregar más productos aquí para tener una lista más larga
]

// Categorías de productos
const categories = [
   { id: 'todos', name: 'Todos' },
   { id: 'bebidas', name: 'Bebidas' },
   { id: 'comidas', name: 'Comidas' },
   { id: 'accesorios', name: 'Accesorios' },
   { id: 'servicios', name: 'Servicios' },
]

const Products = () => {
   const [products, setProducts] = useState(allProducts)
   const [currentCategory, setCurrentCategory] = useState('todos')
   const [searchTerm, setSearchTerm] = useState('')
   const [currentPage, setCurrentPage] = useState(1)
   const [productToDelete, setProductToDelete] = useState<number | null>(null)
   const productsPerPage = 5
   const isMobile = useMobile()

   const filteredProducts = products
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
         setProducts(products.filter((product) => product.id !== productToDelete))
         setProductToDelete(null)
      }
   }

   return (
      <div className="container px-4 py-6">
         <div className="mb-6">
            <Link
               to="/"
               className="flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
               <ArrowLeft className="mr-2 h-4 w-4" />
               Volver al inicio
            </Link>
         </div>
         <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
               <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
               <p className="text-muted-foreground">
                  Gestiona el inventario de productos y servicios
               </p>
            </div>
            <Dialog>
               <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto">
                     <Plus className="mr-2 h-4 w-4" />
                     Nuevo Producto
                  </Button>
               </DialogTrigger>

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
         </div>

         <div className="flex flex-col sm:flex-row sm:items-center mb-6 gap-4">
            <div className="relative flex-1">
               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
               <Input
                  type="search"
                  placeholder="Buscar productos..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleSearch}
               />
            </div>
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
         </div>

         <Card>
            <CardHeader className="p-4">
               <CardTitle className="text-xl">Inventario de Productos</CardTitle>
               <CardDescription>
                  Administra los productos disponibles para venta y consumo
               </CardDescription>
            </CardHeader>

            <CardContent className="p-0 overflow-x-auto"></CardContent>
         </Card>

         <div className="mt-4 flex justify-center">
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

         <AlertDialog
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
         </AlertDialog>
      </div>
   )
}

export default Products
