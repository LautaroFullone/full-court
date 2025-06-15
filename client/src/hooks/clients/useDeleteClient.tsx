import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Client, Reservation } from '@models'
import { deleteClient } from '@services'
import { useModalStore } from '@stores'
import { toast } from 'react-toastify'
import { getApiError } from '@lib'
import { useState } from 'react'

export type DeleteClientError = {
   message: string
   reservations: Reservation[]
}

function useDeleteClient() {
   const closeModal = useModalStore((state) => state.modalActions.closeModal)

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
         const { message } = getApiError(error)

         closeModal('confirm-delete-client')
         toast.error(message)
      },
   })

   return { deleteClientMutate, isLoading }
}

export default useDeleteClient
