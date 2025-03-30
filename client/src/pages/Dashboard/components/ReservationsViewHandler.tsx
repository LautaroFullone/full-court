import { TabsList, TabsTrigger } from '@shadcn'

const ReservationsViewHandler = () => {
   return (
      <TabsList className="w-full sm:w-auto">
         <TabsTrigger value="grid" className="cursor-pointer">
            Vista Grilla
         </TabsTrigger>
         <TabsTrigger value="list" className="cursor-pointer">
            Vista Lista
         </TabsTrigger>
      </TabsList>
   )
}

export default ReservationsViewHandler
