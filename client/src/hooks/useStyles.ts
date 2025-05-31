import { CategoryType, ReservationType } from '@models'

const useStyles = () => {
   function getReservationTypeClass(type: ReservationType) {
      const classes = {
         clase: 'bg-blue-100 text-blue-800',
         partido: 'bg-green-100 text-green-800',
         torneo: 'bg-purple-100 text-purple-800',
         otro: 'bg-amber-100 text-amber-800',
      }
      return classes[type] || 'bg-gray-100 text-gray-800'
   }

   function getCategoryColorClass(category: string) {
      switch (category as CategoryType) {
         case 'kiosco':
            return 'bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300'
         case 'cafeteria':
            return 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300'
         case 'accesorios':
            return 'bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-300'
         case 'otro':
            return 'bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900 dark:text-amber-300'
         default:
            return 'bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300'
      }
   }

   return { getReservationTypeClass, getCategoryColorClass }
}

export default useStyles
