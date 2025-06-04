import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateReservation } from '@services'
import { toast } from 'react-toastify'
import { Reservation } from '@models'
import { useState } from 'react'

function useUpdateReservation() {
   const [isLoading, setIsLoading] = useState(false)
   const queryClient = useQueryClient()

   const { mutateAsync: updateReservationMutate } = useMutation({
      mutationFn: updateReservation,
      onMutate: () => setIsLoading(true),
      onSettled: () => setIsLoading(false),
      onSuccess: (data) => {
         toast.success(data.message)
         queryClient.setQueryData(['reservations'], (old: Reservation[]) =>
            old.map((reservation) =>
               reservation.id === data.reservation.id ? data.reservation : reservation
            )
         )
      },
      onError: (error) => {
         toast.error(error.message)
      },
   })

   return { updateReservationMutate, isLoading }
}

export default useUpdateReservation
