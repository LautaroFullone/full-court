import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateClient } from '@services'
import { toast } from 'react-toastify'
import { useAppStore } from '@stores'
import { getApiError } from '@lib'
import { useState } from 'react'
import { Client } from '@models'

function useUpdateClient() {
   const queryClient = useQueryClient()
   const dispatchSelectedClient = useAppStore(
      (state) => state.appActions.dispatchSelectedClient
   )

   const [isLoading, setIsLoading] = useState(false)

   const { mutateAsync: updateClientMutate } = useMutation({
      mutationFn: updateClient,
      onMutate: () => setIsLoading(true),
      onSettled: () => setIsLoading(false),
      onSuccess: ({ data }) => {
         toast.success(data.message)
         dispatchSelectedClient(data.client)

         queryClient.setQueryData(['clients'], (old: Client[]) =>
            old.map((client) => (client.id === data.client.id ? data.client : client))
         )
      },
      onError: (error) => {
         const { message } = getApiError(error)
         toast.error(message)
      },
   })

   return { updateClientMutate, isLoading }
}

export default useUpdateClient
