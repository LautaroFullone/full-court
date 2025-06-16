import { Client, ClientFormData, Reservation } from '@models'
import { api } from '@lib'

interface UpdateClientParams {
   clientID: Client['id']
   clientData: ClientFormData
}

interface ResponseApi {
   client: Client
   clients: Client[]
   reservations: Reservation[]
   message: string
}

export async function getClients() {
   type Response = Pick<ResponseApi, 'message' | 'clients'>
   return await api.get<Response>(`/clients`, {})
}

export async function createClient(clientData: ClientFormData) {
   type Response = Pick<ResponseApi, 'message' | 'client'>
   return await api.post<Response>(`/clients`, clientData, {})
}

export async function deleteClient(clientID: Client['id']) {
   type Response = Pick<ResponseApi, 'message' | 'client'>
   return await api.delete<Response>(`/clients/${clientID}`)
}

export async function updateClient({ clientID, clientData }: UpdateClientParams) {
   type Response = Pick<ResponseApi, 'message' | 'client'>
   return await api.put<Response>(`/clients/${clientID}`, clientData)
}
