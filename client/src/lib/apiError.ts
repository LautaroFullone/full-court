/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client, Product, Reservation } from '@models'
import { AxiosError } from 'axios'

type ApiErrorReturn = {
   message: string
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

   console.log('# axiosError: ', axiosError)
   console.log('# data: ', data)

   return {
      message: axiosError.message || 'Ocurrió un error inesperado.',
      ...data,
   }
}
