import { Court, Reservation, ReservationFormData, ShiftType } from '@models'

import { api, handleApiError } from '@lib'

interface ResponseApi {
   reservation: Reservation
   reservations: Reservation[]
   message: string
}

export async function getReservationsByDate(date: Date) {
   type Response = Pick<ResponseApi, 'message' | 'reservations'>

   try {
      const { data } = await api.get<Response>(`/reservations`, {
         params: { date },
      })
      return data
   } catch (error) {
      throw handleApiError(error)
   }
}

interface ReservationData extends ReservationFormData {
   courtID: Court['id']
   date: string
   shift: ShiftType
}

export async function createReservation(reservationData: ReservationData) {
   console.log('## createReservation: ', reservationData)
   type Response = Pick<ResponseApi, 'message' | 'reservation'>

   try {
      const { data } = await api.post<Response>(`/reservations`, reservationData, {})
      return data
   } catch (error) {
      throw handleApiError(error)
   }
}

export async function deleteReservation(reservationID: Reservation['id']) {
   type Response = Pick<ResponseApi, 'message' | 'reservation'>

   try {
      const { data } = await api.delete<Response>(`/reservations/${reservationID}`)
      return data
   } catch (error) {
      throw handleApiError(error)
   }
}

export async function updateReservation({
   reservationID,
   reservationData,
}: {
   reservationID: Reservation['id']
   reservationData: ReservationFormData
}) {
   type Response = Pick<ResponseApi, 'message' | 'reservation'>

   try {
      const { data } = await api.put<Response>(
         `/reservations/${reservationID}`,
         reservationData
      )
      return data
   } catch (error) {
      throw handleApiError(error)
   }
}
