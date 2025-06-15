import {
   Badge,
   Button,
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@shadcn'
import { Edit, Package, Trash2 } from 'lucide-react'
import { useStyles } from '@hooks'
import { Product } from '@models'
import { formatPriceDisplay } from '@lib'

interface ProductCardProps {
   product: Product
   onEdit: () => void
   onDelete: () => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
   const { getCategoryColorClass } = useStyles()

   return (
      <Card key={product.id} className="overflow-hidden gap-0 flex justify-center">
         <CardHeader>
            <div className="flex justify-between items-start">
               <CardTitle className="text-lg">{product.name}</CardTitle>

               <div className="flex gap-1">
                  <Button
                     variant="ghost"
                     size="icon"
                     className="h-8 w-8"
                     onClick={onEdit}
                  >
                     <Edit className="h-4 w-4" />
                  </Button>

                  <Button
                     variant="ghost"
                     size="icon"
                     className="h-8 w-8 text-destructive hover:text-destructive"
                     onClick={onDelete}
                  >
                     <Trash2 className="h-4 w-4" />
                  </Button>
               </div>
            </div>
         </CardHeader>

         <CardContent className="space-y-3">
            <CardDescription className="text-sm">
               {'Una descripción de ejemplo'}
            </CardDescription>

            <div className="flex justify-between items-center">
               <div className="text-2xl font-bold">
                  {formatPriceDisplay(product.price)}
               </div>
               <Badge
                  className={getCategoryColorClass(product.category)}
                  variant="secondary"
               >
                  {product.category}
               </Badge>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
               <Package className="h-4 w-4" />
               <span>Stock: {product.stock} unidades</span>
            </div>
         </CardContent>
      </Card>
   )
}
export default ProductCard
