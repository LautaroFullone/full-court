import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteReservation } from '@services'
import { toast } from 'react-toastify'
import { Reservation } from '@models'
import { useState } from 'react'

function useDeleteReservation() {
   const [isLoading, setIsLoading] = useState(false)
   const queryClient = useQueryClient()

   const { mutateAsync: deleteReservationMutate } = useMutation({
      mutationFn: deleteReservation,
      onMutate: () => setIsLoading(true),
      onSettled: () => setIsLoading(false),
      onSuccess: (data) => {
         toast.success(data.message)
         queryClient.setQueryData(['reservations'], (old: Reservation[]) =>
            old.filter((reservation) => reservation?.id !== data?.reservation.id)
         )
      },
      onError: (error) => {
         toast.error(error.message)
      },
   })

   return { deleteReservationMutate, isLoading }
}

export default useDeleteReservation
