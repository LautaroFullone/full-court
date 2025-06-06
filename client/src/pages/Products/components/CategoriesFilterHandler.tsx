import { Tabs, TabsList, TabsTrigger } from '@shadcn'
import { CATEGORY_TYPES_VALUES } from '@models'
import { useAppStore } from '@stores'

interface CategoriesFilterProps {
   disabled: boolean
}

const CategoriesFilterHandler: React.FC<CategoriesFilterProps> = ({ disabled }) => {
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
            {['todos', ...CATEGORY_TYPES_VALUES].map((category) => (
               <TabsTrigger
                  key={`category-${category}`}
                  value={category}
                  disabled={disabled}
                  className="flex-1 sm:flex-none cursor-pointer capitalize"
               >
                  {category}
               </TabsTrigger>
            ))}
         </TabsList>
      </Tabs>
   )
}

export default CategoriesFilterHandler
