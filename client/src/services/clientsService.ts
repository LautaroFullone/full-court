import { Client, ClientFormData } from '@models'
import { api } from '@lib'

interface ResponseApi {
   client: Client
   clients: Client[]
   message: string
}

export async function getClients() {
   type Response = Pick<ResponseApi, 'clients'>

   try {
      const { data } = await api.get<Response>(`/clients`, {})
      return data
   } catch {
      throw new Error('getClients failed')
   }
}

export async function createClient(clientData: ClientFormData) {
   type Response = Pick<ResponseApi, 'client' | 'message'>

   try {
      const { data } = await api.post<Response>(`/clients`, clientData, {})

      return data
   } catch {
      throw new Error('createClient failed')
   }
}
