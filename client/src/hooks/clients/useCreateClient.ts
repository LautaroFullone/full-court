import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@services'
import { toast } from 'react-toastify'
import { useState } from 'react'

const useCreateClient = () => {
   const [isLoading, setIsLoading] = useState(false)
   const queryClient = useQueryClient()

   const { mutateAsync: createClientMutate } = useMutation({
      mutationFn: createClient,
      onMutate: () => setIsLoading(true),
      onSettled: () => setIsLoading(false),
      onSuccess: (data) => {
         toast.success(data.message)
         queryClient.setQueryData(['clients'], (old: []) => [...old, data.client])
      },
      onError: (error) => {
         console.log('## createClient: ', error)
         toast.error(error.message)
      },
   })

   return { createClientMutate, isLoading }
}

export default useCreateClient
