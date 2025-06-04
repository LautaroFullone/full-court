import { Reservation, ReservationFormData } from '@models'
import { api, handleApiError } from '@lib'

interface ResponseApi {
   reservation: Reservation
   reservations: Reservation[]
   message: string
}

export async function getReservationsByDate(date: string) {
   type Response = Pick<ResponseApi, 'message' | 'reservations'>

   try {
      const { data } = await api.get<Response>(`/reservations/${date}`, {})
      return data
   } catch (error) {
      throw handleApiError(error)
   }
}

export async function createReservation(params) {
   console.log('## createReservation: ', params)
   type Response = Pick<ResponseApi, 'message' | 'reservation'>

   // const reservationBody = { ...reservationData, date, courtID, shift }

   try {
      const { data } = await api.post<Response>(`/reservations`, params, {})
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
