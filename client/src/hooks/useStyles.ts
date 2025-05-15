import { ReservationType } from '@models'

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

   return { getReservationTypeClass }
}

export default useStyles
