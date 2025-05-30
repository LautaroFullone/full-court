import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProduct } from '@services'
import { toast } from 'react-toastify'
import { Product } from '@models'
import { useState } from 'react'

function useUpdateProduct() {
   const [isLoading, setIsLoading] = useState(false)
   const queryClient = useQueryClient()

   const { mutateAsync: updateProductMutate } = useMutation({
      mutationFn: updateProduct,
      onMutate: () => setIsLoading(true),
      onSettled: () => setIsLoading(false),
      onSuccess: (data) => {
         toast.success(data.message)
         queryClient.setQueryData(['products'], (old: Product[]) =>
            old.map((product) =>
               product.id === data.product.id ? data.product : product
            )
         )
      },
      onError: (error) => {
         console.log('## useUpdateProduct : ', error)
         toast.error(error.message)
      },
   })

   return { updateProductMutate, isLoading }
}

export default useUpdateProduct
