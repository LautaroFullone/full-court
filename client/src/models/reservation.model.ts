import { ShiftType } from './shift.model'
import { Product } from './product.model'
import {
   Client,
   CLIENT_TYPES_VALUES,
   clientFormValidation,
   ClientType,
} from './client.model'
import { z } from 'zod'

export const RESERVATION_TYPES_VALUES = ['clase', 'partido', 'torneo', 'otro'] as const

export type ReservationType = (typeof RESERVATION_TYPES_VALUES)[number]

type ReservationProducts = Omit<Product, 'stock'> & { amount: number }

export interface Reservation {
   id: string
   date: string
   shift: ShiftType
   courtId: string
   turnId: string
   owner: Client
   price: number
   products?: ReservationProducts[]
   type: ReservationType
}

// Valida fechas en formato dd/mm/aaaa (no valida que la fecha *exista*, solo el formato)
// const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/

const existingClientSchema = z.object({
   id: z.string().uuid({ message: 'ID de cliente inválido' }),
})

export const reservationFormValidation = z
   .object({
      date: z.string(),
      courtID: z.string(),
      shift: z.string(),
      type: z.enum(RESERVATION_TYPES_VALUES),
      clientType: z.enum(CLIENT_TYPES_VALUES),

      // datos para cliente nuevo
      name: z.string().optional(),
      dni: z.string().optional(),
      phone: z.string().optional(),

      clientID: z.string().optional(),
   })
   .superRefine((data, ctx) => {
      if (data.clientType === 'new-client') {
         const parsed = clientFormValidation.safeParse({
            name: data.name,
            dni: data.dni,
            phone: data.phone,
         })

         if (!parsed.success) {
            parsed.error.errors.forEach((err) => {
               ctx.addIssue({
                  path: [err.path[0]],
                  message: err.message,
                  code: z.ZodIssueCode.custom,
               })
            })
         }
      }

      if (data.clientType === 'existing-client' && !data.clientID) {
         ctx.addIssue({
            path: ['clientID'],
            message: 'Debes seleccionar un cliente',
            code: z.ZodIssueCode.custom,
         })
      }
   })

export type ReservationFormData = {
   type: ReservationType
   clientType: ClientType
   name?: string
   dni?: string
   phone?: string
   clientID?: string
}
