import { useStyles } from '@hooks'
import { Product } from '@models'
import { Badge, Button, Card, CardContent, CardFooter } from '@shadcn'
import { Edit, Package, Trash2 } from 'lucide-react'

interface ProductCardProps {
   product: Product
   onEdit: () => void
   onDelete: () => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
   const { getCategoryColorClass } = useStyles()

   return (
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

            <div className="grid grid-cols-1 text-center items-center lg:grid-cols-2 ">
               <div className="text-2xl font-bold w-auto">
                  ${Number(product.price).toLocaleString('es-AR')}
               </div>
               <div className="w-auto lg:justify-self-end">
                  <Badge variant="outline">Stock: {product.stock}</Badge>
               </div>
            </div>
         </CardContent>

         <CardFooter className="w-full grid grid-cols-1 gap-2">
            <Button variant="outline" size="lg" onClick={() => onEdit()}>
               <Edit className="" />
               Editar
            </Button>

            <Button
               variant="outline"
               size="lg"
               className="text-destructive hover:text-destructive"
               onClick={() => onDelete()}
            >
               <Trash2 className="" />
               Eliminar
            </Button>
         </CardFooter>
      </Card>
   )
}
export default ProductCard
