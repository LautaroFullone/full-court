import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProduct } from '@services'
import { toast } from 'react-toastify'
import { getApiError } from '@lib'
import { Product } from '@models'
import { useState } from 'react'

function useDeleteProduct() {
   const queryClient = useQueryClient()

   const [isLoading, setIsLoading] = useState(false)

   const { mutateAsync: deleteProductMutate } = useMutation({
      mutationFn: deleteProduct,
      onMutate: () => setIsLoading(true),
      onSettled: () => setIsLoading(false),
      onSuccess: ({ data }) => {
         toast.success(data.message)

         queryClient.setQueryData(['products'], (old: Product[]) =>
            old.filter((product) => product?.id !== data?.product.id)
         )
      },
      onError: (error) => {
         const { message } = getApiError(error)

         toast.error(message)
      },
   })

   return { deleteProductMutate, isLoading }
}

export default useDeleteProduct
