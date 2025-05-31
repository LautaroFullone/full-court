import { Tabs, TabsList, TabsTrigger } from '@shadcn'
import { useAppStore } from '@stores'

const categories = [
   { id: 'todos', name: 'Todos' },
   { id: 'bebidas', name: 'Bebidas' },
   { id: 'comidas', name: 'Comidas' },
   { id: 'accesorios', name: 'Accesorios' },
]

const CategoriesFilterHandler: React.FC = () => {
   const selectedCategory = useAppStore((state) => state.selectedCategory)
   const dispatchSelectedCategory = useAppStore(
      (state) => state.appActions.dispatchSelectedCategory
   )

   return (
      <Tabs
         value={selectedCategory}
         onValueChange={(value) => dispatchSelectedCategory(value)}
         className="w-full sm:w-auto flex "
      >
         <TabsList className="w-full h-full sm:w-auto overflow-x-auto flex whitespace-nowrap">
            {categories.map((category) => (
               <TabsTrigger
                  key={`category-${category.id}`}
                  value={category.id}
                  className="flex-1 sm:flex-none cursor-pointer"
               >
                  {category.name}
               </TabsTrigger>
            ))}
         </TabsList>
      </Tabs>
   )
}

export default CategoriesFilterHandler
