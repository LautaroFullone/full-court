import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProduct } from '@services'
import { toast } from 'react-toastify'
import { Product } from '@models'
import { useState } from 'react'

function useDeleteProduct() {
   const [isLoading, setIsLoading] = useState(false)
   const queryClient = useQueryClient()

   const { mutateAsync: deleteProductMutate } = useMutation({
      mutationFn: deleteProduct,
      onMutate: () => setIsLoading(true),
      onSettled: () => setIsLoading(false),
      onSuccess: (data) => {
         toast.success(data.message)
         queryClient.setQueryData(['products'], (old: Product[]) =>
            old.filter((product) => product?.id !== data?.product.id)
         )
      },
      onError: (error) => {
         console.log('## deleteProduct : ', error)
         toast.error(error.message)
      },
   })

   return { deleteProductMutate, isLoading }
}

export default useDeleteProduct
