import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct } from '@services'
import { toast } from 'react-toastify'
import { getApiError } from '@lib'
import { useState } from 'react'

const useCreateProduct = () => {
   const queryClient = useQueryClient()

   const [isLoading, setIsLoading] = useState(false)

   const { mutateAsync: createProductMutate } = useMutation({
      mutationFn: createProduct,
      onMutate: () => setIsLoading(true),
      onSettled: () => setIsLoading(false),
      onSuccess: ({ data }) => {
         toast.success(data.message)

         queryClient.setQueryData(['products'], (old: []) => {
            const listUpdated = [...old, data.product]
            return listUpdated.sort((a, b) => a.name.localeCompare(b.name))
         })
      },
      onError: (error) => {
         const { message } = getApiError(error)
         toast.error(message)
      },
   })

   return { createProductMutate, isLoading }
}

export default useCreateProduct
