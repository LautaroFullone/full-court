import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createReservation } from '@services'
import { toast } from 'react-toastify'
import { useState } from 'react'

const useCreateReservation = () => {
   const [isLoading, setIsLoading] = useState(false)
   const queryClient = useQueryClient()

   const { mutateAsync: createReservationMutate } = useMutation({
      mutationFn: createReservation,
      onMutate: () => setIsLoading(true),
      onSettled: () => setIsLoading(false),
      onSuccess: (data) => {
         toast.success(data.message)
         queryClient.setQueryData(['reservations'], (old: []) => [
            ...old,
            data.reservation,
         ])
      },
      onError: (error) => {
         toast.error(error.message)
      },
   })

   return { createReservationMutate, isLoading }
}

export default useCreateReservation
