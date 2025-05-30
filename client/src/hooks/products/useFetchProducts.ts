import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@services'
import { toast } from 'react-toastify'

function useFetchProducts() {
   const { data, isPending, error, isError } = useQuery({
      queryKey: ['products'],
      queryFn: async () => {
         //el retorno de la funcion es lo unico que se va a cachear
         const response = await getProducts()
         return response.products // en este caso solo cacheamos en array de products y no 'message'
      },
      staleTime: 20 * 60 * 1000, //20min
      retry: 1,
   })

   if (isError) {
      toast.error(error.message)
   }

   return {
      products: data || [],
      isPending,
      isError,
      error,
   }
}

export default useFetchProducts
