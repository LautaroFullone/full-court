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
   type Response = Pick<ResponseApi, 'message' | 'client'>

   try {
      const { data } = await api.post<Response>(`/clients`, clientData, {})
      return data
   } catch (error) {
      throw handleApiError(error)
   }
}

export async function deleteClient(clientID: Client['id']) {
   type Response = Pick<ResponseApi, 'message' | 'client'>

   try {
      const { data } = await api.delete<Response>(`/clients/${clientID}`)
      console.log('data: ', data)
      return data
   } catch (error) {
      throw handleApiError(error)
   }
}

export async function updateClient({
   clientID,
   clientData,
}: {
   clientID: Client['id']
   clientData: ClientFormData
}) {
   type Response = Pick<ResponseApi, 'message' | 'client'>

   try {
      const { data } = await api.put<Response>(`/clients/${clientID}`, clientData)
      console.log('data: ', data)
      return data
   } catch (error) {
      throw handleApiError(error)
   }
}
