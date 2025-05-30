import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct } from '@services'
import { toast } from 'react-toastify'
import { useState } from 'react'

const useCreateProduct = () => {
   const [isLoading, setIsLoading] = useState(false)
   const queryClient = useQueryClient()

   const { mutateAsync: createProductMutate } = useMutation({
      mutationFn: createProduct,
      onMutate: () => setIsLoading(true),
      onSettled: () => setIsLoading(false),
      onSuccess: (data) => {
         toast.success(data.message)
         queryClient.setQueryData(['products'], (old: []) => [...old, data.product])
      },
      onError: (error) => {
         console.log('## createProduct: ', error)
         toast.error(error.message)
      },
   })

   return { createProductMutate, isLoading }
}

export default useCreateProduct
