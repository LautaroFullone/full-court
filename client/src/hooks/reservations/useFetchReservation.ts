import { getReservationsByDate } from '@services'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

function useFetchReservations(date: string) {
   const { data, isPending, error, isError } = useQuery({
      queryKey: ['reservations', date],
      queryFn: async () => {
         //el retorno de la funcion es lo unico que se va a cachear
         const response = await getReservationsByDate(date)
         return response.reservations // en este caso solo cacheamos en array de clientes y no 'message'
      },
      staleTime: 20 * 60 * 1000, //20min
      retry: 1,
   })

   if (isError) {
      toast.error(error.message)
   }

   return {
      reservations: data || [],
      isPending,
      isError,
      error,
   }
}

export default useFetchReservations
