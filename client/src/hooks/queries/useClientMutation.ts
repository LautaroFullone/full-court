import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@services'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { Client } from '@models'

const useClientMutation = () => {
   const [isLoading, setIsLoading] = useState(false)
   const queryClient = useQueryClient()

   const { mutateAsync: createClientMutation } = useMutation({
      mutationFn: createClient,
      onMutate: () => setIsLoading(true),
      onSettled: () => setIsLoading(false),
      onSuccess: (data) => {
         console.log('toast', data)
         toast.success(data.message)
         queryClient.setQueryData(['clients'], (old: []) => [...old, data.client])
      },
      onError: (error) => toast.error(error.message),
   })

   return { createClientMutation, isLoading }
}

export default useClientMutation
