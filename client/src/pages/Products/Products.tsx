import { useState } from 'react'
import { ArrowLeft, LayoutGrid, Table2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Tabs, TabsList, TabsTrigger } from '@shadcn'
import { ProductsTable } from './components'
import { Product } from '@models'

// Datos de ejemplo para los productos
const allProducts: Product[] = [
   { id: '1', name: 'Café', price: '2500', category: 'bebidas', stock: 25 },
   { id: '2', name: 'Agua mineral', price: '1350', category: 'bebidas', stock: 30 },
   { id: '3', name: 'Gaseosa', price: '3200', category: 'bebidas', stock: 20 },
   { id: '4', name: 'Grip', price: '4000', category: 'accesorios', stock: 15 },
   {
      id: '5',
      name: 'Pelota (pack x3)',
      price: '15000',
      category: 'accesorios',
      stock: 10,
   },
   {
      id: '6',
      name: 'Alquiler de raqueta',
      price: '4500',
      category: 'servicios',
      stock: 8,
   },
   { id: '7', name: 'Sandwich', price: '1500', category: 'comidas', stock: 12 },
   { id: '8', name: 'Barra energética', price: '1000', category: 'comidas', stock: 18 },
   { id: '9', name: 'Muñequera', price: '8000', category: 'accesorios', stock: 7 },
   { id: '10', name: 'Visera', price: '7000', category: 'accesorios', stock: 5 },
   { id: '11', name: 'Cerveza', price: '4400', category: 'bebidas', stock: 22 },
   { id: '12', name: 'Jugo', price: '3500', category: 'bebidas', stock: 15 },
   { id: '13', name: 'Ensalada', price: '3500', category: 'comidas', stock: 8 },
   { id: '14', name: 'Clase particular', price: '1200', category: 'servicios', stock: 5 },
]

export default function ProductsPage() {
   const [viewVersion, setViewVersion] = useState<number>(1)

   return (
      <div className="px-4 py-6">
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
            <Tabs
               value={viewVersion.toString()}
               onValueChange={(v) => setViewVersion(Number.parseInt(v))}
            >
               <TabsList>
                  <TabsTrigger value="1">
                     <Table2 className="h-4 w-4 mr-2" />
                     <span className="hidden sm:inline">Tabla</span>
                  </TabsTrigger>
                  <TabsTrigger value="2">
                     <LayoutGrid className="h-4 w-4 mr-2" />
                     <span className="hidden sm:inline">Tarjetas</span>
                  </TabsTrigger>
               </TabsList>
            </Tabs>
         </div>

         <ProductsTable products={allProducts} />
      </div>
   )
}
