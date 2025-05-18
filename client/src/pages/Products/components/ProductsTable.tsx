import { Button, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shadcn'
import { Edit, Table, Trash2 } from 'lucide-react'
import { useMobile } from '@hooks'
import { Product } from '@models'

interface ProductsTableProps {
   products: Product[]
}

const ProductsTable: React.FC<ProductsTableProps> = ({ products }) => {
   const isMobile = useMobile()
   return (
      <Table>
         <TableHeader>
            <TableRow>
               <TableHead className="w-[50px]">ID</TableHead>
               <TableHead>Nombre</TableHead>
               <TableHead className={isMobile ? 'hidden md:table-cell' : ''}>
                  Categoría
               </TableHead>
               <TableHead className="text-right">Precio</TableHead>
               <TableHead
                  className={
                     isMobile ? 'hidden md:table-cell text-center' : 'text-center'
                  }
               >
                  Stock
               </TableHead>
               <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
         </TableHeader>
         <TableBody>
            {products.map((product) => (
               <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>
                     {product.name}
                     {isMobile && (
                        <div className="text-xs text-muted-foreground mt-1 capitalize">
                           {product.category} • Stock: {product.stock}
                        </div>
                     )}
                  </TableCell>
                  <TableCell
                     className={
                        isMobile ? 'hidden md:table-cell capitalize' : 'capitalize'
                     }
                  >
                     {product.category}
                  </TableCell>
                  <TableCell className="text-right">${product.price}</TableCell>
                  <TableCell
                     className={
                        isMobile ? 'hidden md:table-cell text-center' : 'text-center'
                     }
                  >
                     {product.stock}
                  </TableCell>
                  <TableCell className="text-right">
                     <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                           <Edit className="h-4 w-4" />
                        </Button>

                        <Button
                           variant="ghost"
                           size="icon"
                           className="h-8 w-8 text-destructive"
                           onClick={() => handleDeleteProduct(product.id)}
                        >
                           <Trash2 className="h-4 w-4" />
                        </Button>
                     </div>
                  </TableCell>
               </TableRow>
            ))}
         </TableBody>
      </Table>
   )
}
export default ProductsTable
