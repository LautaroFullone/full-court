/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client, Product, Reservation } from '@models'
import { AxiosError } from 'axios'

export const apiErrorMessages = {
   CLIENT_NOT_FOUND: 'El cliente no existe',
   CLIENT_HAS_RESERVATIONS:
      'No se puede eliminar el cliente porque tiene reservas activas',
   INTERNAL_SERVER_ERROR: 'Ocurrió un error inesperado del servidor',
   UNKNOWN: 'Error desconocido',
} as const

export type ErrorCodeType = keyof typeof apiErrorMessages

type ApiErrorReturn = {
   message: string
   errorCode: ErrorCodeType
   client?: Client
   clients?: Client[]
   product?: Product
   products?: Product[]
   reservation?: Reservation
   reservations?: Reservation[]
}

export function getApiError(error: unknown): ApiErrorReturn {
   const axiosError = error as AxiosError<any>
   const data = axiosError.response?.data || {}

   const errorCode = (data.errorCode || 'UNKNOWN') as ErrorCodeType
   const message = apiErrorMessages[errorCode] || 'Ocurrió un error inesperado.'

   return {
      errorCode,
      message,
      ...data,
   }
}
