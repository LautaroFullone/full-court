import { useQuery } from '@tanstack/react-query'
import { getClients } from '@services'
import { toast } from 'react-toastify'

const useClientsQuery = () => {
   const { data, isPending, error, isError } = useQuery({
      queryKey: ['clients'],
      queryFn: getClients,
      staleTime: 20 * 60 * 1000, //20min
      retry: 1,
   })

   if (isError) {
      toast.error(error.message)
   }

   return {
      clients: data?.clients || [],
      isPending,
      isError,
      error,
   }
}

export default useClientsQuery
