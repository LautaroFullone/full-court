import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateReservation } from '@services'
import { toast } from 'react-toastify'
import { Reservation } from '@models'
import { useAppStore } from '@stores'
import { useState } from 'react'

function useUpdateReservation() {
   const selectedDate = useAppStore((state) => state.selectedDate)

   const queryClient = useQueryClient()

   const [isLoading, setIsLoading] = useState(false)

   const { mutateAsync: updateReservationMutate } = useMutation({
      mutationFn: updateReservation,
      onMutate: () => setIsLoading(true),
      onSettled: () => setIsLoading(false),
      onSuccess: (data) => {
         toast.success(data.message)
         queryClient.setQueryData(['reservations', selectedDate], (old: Reservation[]) =>
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
