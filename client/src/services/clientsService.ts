import { Client, ClientFormData } from '@models'
import { api, handleApiError } from '@lib'

interface ResponseApi {
   client: Client
   clients: Client[]
   message: string
}

export async function getClients() {
   type Response = Pick<ResponseApi, 'message' | 'clients'>

   try {
      const { data } = await api.get<Response>(`/clients`, {})
      return data
   } catch (error) {
      throw handleApiError(error)
   }
}

export async function createClient(clientData: ClientFormData) {
   type Response = Pick<ResponseApi, 'client' | 'message'>

   try {
      const { data } = await api.post<Response>(`/clients`, clientData, {})
      return data
   } catch (error) {
      throw handleApiError(error)
   }
}
