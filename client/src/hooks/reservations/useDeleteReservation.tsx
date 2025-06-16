import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteReservation } from '@services'
import { toast } from 'react-toastify'
import { Reservation } from '@models'
import { useAppStore } from '@stores'
import { useState } from 'react'

function useDeleteReservation() {
   const selectedDate = useAppStore((state) => state.selectedDate)
   const queryClient = useQueryClient()

   const [isLoading, setIsLoading] = useState(false)

   const { mutateAsync: deleteReservationMutate } = useMutation({
      mutationFn: deleteReservation,
      onMutate: () => setIsLoading(true),
      onSettled: () => setIsLoading(false),
      onSuccess: ({ data }) => {
         toast.success(data.message)
         queryClient.setQueryData(['reservations', selectedDate], (old: Reservation[]) =>
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
