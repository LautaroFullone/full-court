import { Court, Reservation, ReservationFormData, ShiftType } from '@models'
import { ResponseApi } from './ResponseApi'
import { api } from '@lib'

interface UpdateReservationParams {
   reservationID: Reservation['id']
   reservationData: ReservationFormData
}

interface ReservationData extends ReservationFormData {
   courtID: Court['id']
   date: string
   shift: ShiftType
}

export async function getReservationsByDate(date: Reservation['date']) {
   type Response = Pick<ResponseApi, 'message' | 'reservations'>
   return await api.get<Response>(`/reservations`, {
      params: { date },
   })
}

export async function createReservation(reservationData: ReservationData) {
   type Response = Pick<ResponseApi, 'message' | 'reservation'>
   return await api.post<Response>(`/reservations`, reservationData, {})
}

export async function deleteReservation(reservationID: Reservation['id']) {
   type Response = Pick<ResponseApi, 'message' | 'reservation'>
   return await api.delete<Response>(`/reservations/${reservationID}`)
}

export async function updateReservation({
   reservationID,
   reservationData,
}: UpdateReservationParams) {
   type Response = Pick<ResponseApi, 'message' | 'reservation'>
   return await api.put<Response>(`/reservations/${reservationID}`, reservationData)
}
