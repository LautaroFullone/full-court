import { ClientInput, ClientUpdateInput } from '../models/client'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createClient(data: ClientInput) {
   return prisma.client.create({ data })
}

export async function updateClient(id: string, data: ClientUpdateInput) {
   return prisma.client.update({
      where: { id },
      data,
   })
}

export async function deleteClient(id: string) {
   return prisma.client.delete({ where: { id } })
}

export async function getAllClients() {
   return prisma.client.findMany({ orderBy: { createdAt: 'desc' } })
}
