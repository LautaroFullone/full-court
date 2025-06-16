import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@services'
import { toast } from 'react-toastify'
import { getApiError } from '@lib'
import { useState } from 'react'

const useCreateClient = () => {
   const queryClient = useQueryClient()

   const [isLoading, setIsLoading] = useState(false)

   const { mutateAsync: createClientMutate } = useMutation({
      mutationFn: createClient,
      onMutate: () => setIsLoading(true),
      onSettled: () => setIsLoading(false),
      onSuccess: ({ data }) => {
         toast.success(data.message)

         //TODO: ordenar dependiendo lo qu esté seleccionado
         queryClient.setQueryData(['clients'], (old: []) => [...old, data.client])
      },
      onError: (error) => {
         const { message } = getApiError(error)
         toast.error(message)
      },
   })

   return { createClientMutate, isLoading }
}

export default useCreateClient
