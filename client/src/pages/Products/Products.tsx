import { Button } from '@/components'

const Products = () => {
   return (
      <div className="flex flex-col items-center justify-center min-h-svh bg-red-400">
         <Button onClick={() => console.log('hola')} className="bg-amber-300 ">
            Click me
         </Button>
      </div>
   )
}

export default Products
