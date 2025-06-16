import { useQuery } from '@tanstack/react-query'
import { getClients } from '@services'
import { toast } from 'react-toastify'

function useFetchClients() {
   const { data, isPending, error, isError } = useQuery({
      queryKey: ['clients'],
      queryFn: async () => {
         //el retorno de la funcion es lo unico que se va a cachear
         const response = await getClients()
         return response.data.clients // en este caso solo cacheamos en array de clientes y no 'message'
      },
      staleTime: 20 * 60 * 1000, //20min
      retry: 1,
   })

   if (isError) {
      toast.error(error.message)
   }

   return {
      clients: data || [],
      isPending,
      isError,
      error,
   }
}

export default useFetchClients
