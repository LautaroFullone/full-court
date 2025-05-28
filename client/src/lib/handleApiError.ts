import { AxiosError } from 'axios'

export function handleApiError(error: unknown): Error {
   if (error instanceof AxiosError) {
      const message =
         error.response?.data?.message || error.message || 'Ocurrió un problema con axios'

      return new Error(message)
   }

   if (error instanceof Error) {
      return new Error(error.message)
   }

   return new Error('Ocurrió un error inesperado')
}
