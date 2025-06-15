import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@services'
import { toast } from 'react-toastify'
import { getApiError } from '@lib'
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
         const errore = getApiError(error)
         console.log('# createClient: ', errore)
         toast.error(errore.message)
      },
   })

   return { createClientMutate, isLoading }
}

export default useCreateClient
