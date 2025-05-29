import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient, deleteClient } from '@services'
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
         toast.success(data.message)
         queryClient.setQueryData(['clients'], (old: []) => [...old, data.client])
      },
      onError: (error) => {
         console.log('## createClientMutation: ', error)
         toast.error(error.message)
      },
   })

   const { mutateAsync: deleteClientMutation } = useMutation({
      mutationFn: deleteClient,
      onMutate: () => setIsLoading(true),
      onSettled: () => setIsLoading(false),
      onSuccess: (data) => {
         toast.success(data.message)
         queryClient.setQueryData(['clients'], (old: Client[]) =>
            old.filter((client) => client?.id !== data?.client.id)
         )
      },
      onError: (error) => {
         console.log('## deleteClientMutation: ', error)
         toast.error(error.message)
      },
   })

   return { createClientMutation, deleteClientMutation, isLoading }
}

export default useClientMutation
