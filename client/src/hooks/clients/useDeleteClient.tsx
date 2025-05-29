import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteClient } from '@services'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { Client } from '@models'

function useDeleteClient() {
   const [isLoading, setIsLoading] = useState(false)
   const queryClient = useQueryClient()

   const { mutateAsync: deleteClientMutate } = useMutation({
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
         console.log('## deleteClient : ', error)
         toast.error(error.message)
      },
   })

   return { deleteClientMutate, isLoading }
}

export default useDeleteClient
