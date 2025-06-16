import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProduct } from '@services'
import { toast } from 'react-toastify'
import { getApiError } from '@lib'
import { Product } from '@models'
import { useState } from 'react'

function useUpdateProduct() {
   const queryClient = useQueryClient()

   const [isLoading, setIsLoading] = useState(false)

   const { mutateAsync: updateProductMutate } = useMutation({
      mutationFn: updateProduct,
      onMutate: () => setIsLoading(true),
      onSettled: () => setIsLoading(false),
      onSuccess: ({ data }) => {
         toast.success(data.message)

         queryClient.setQueryData(['products'], (old: Product[]) => {
            const listUpdated = old.map((product) =>
               product.id === data.product.id ? data.product : product
            )
            return listUpdated.sort((a, b) => a.name.localeCompare(b.name))
         })
      },
      onError: (error) => {
         const { message } = getApiError(error)
         toast.error(message)
      },
   })

   return { updateProductMutate, isLoading }
}

export default useUpdateProduct
