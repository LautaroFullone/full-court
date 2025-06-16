import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createReservation } from '@services'
import { toast } from 'react-toastify'
import { useAppStore } from '@stores'
import { useState } from 'react'

const useCreateReservation = () => {
   const selectedDate = useAppStore((state) => state.selectedDate)
   const queryClient = useQueryClient()

   const [isLoading, setIsLoading] = useState(false)

   const { mutateAsync: createReservationMutate } = useMutation({
      mutationFn: createReservation,
      onMutate: () => setIsLoading(true),
      onSettled: () => setIsLoading(false),
      onSuccess: ({ data }) => {
         toast.success(data.message)

         queryClient.setQueryData(['reservations', selectedDate], (old: []) => [
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
