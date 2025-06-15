/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios'

export function handleApiError(error: unknown): Error {
   if (error instanceof AxiosError) {
      const message =
         error.response?.data?.message || error.message || 'Ocurrió un problema con axios'

      const err = new Error(message) as Error & { data?: any }
      err.data = error.response?.data
      return err
   }

   if (error instanceof Error) {
      return new Error(error.message)
   }

   return new Error('Ocurrió un error inesperado')
}
