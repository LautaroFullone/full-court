import { Reservation } from './reservation.model'
import { z } from 'zod'

export interface Client {
   id: string
   name: string
   dni: string
   phone: string
   email?: string
   reservations: Reservation[]
   lastVisit?: string
}

export const clientFormValidation = z.object({
   name: z
      .string()
      .min(1, 'El nombre es obligatorio')
      .max(50, 'El nombre no puede superar los 50 caracteres'),
   dni: z
      .string()
      .min(6, { message: 'El DNI debe tener al menos 6 dígitos' })
      .max(10, { message: 'El DNI no puede tener más de 10 dígitos' })
      .regex(/^\d+$/, { message: 'El DNI debe contener solo números' }),
   phone: z
      .string()
      .min(6, 'El celular es obligatorio')
      .max(20, 'El celular es demasiado largo')
      .regex(/^\d+$/, { message: 'El celular debe contener solo números' }),
   email: z.string().email('Debe ser un email válido').or(z.literal('')).optional(),
})

export type ClientFormData = z.infer<typeof clientFormValidation>

export const CLIENT_TYPES_VALUES = ['new-client', 'existing-client'] as const
export type ClientType = (typeof CLIENT_TYPES_VALUES)[number]

export const CLIENTS = [
   {
      id: 'client_1',
      name: 'Carlos Rodríguez',
      phone: '555-1001',
      email: 'carlos.rodriguez@ejemplo.com',
   },
   {
      id: 'client_2',
      name: 'Ana Martínez',
      phone: '555-1002',
      email: 'ana.martinez@ejemplo.com',
   },
   {
      id: 'client_3',
      name: 'Luis González',
      phone: '555-1003',
      email: 'luis.gonzalez@ejemplo.com',
   },
   {
      id: 'client_4',
      name: 'María López',
      phone: '555-1004',
      email: 'maria.lopez@ejemplo.com',
   },
   {
      id: 'client_5',
      name: 'Juan Pérez',
      phone: '555-1005',
      email: 'juan.perez@ejemplo.com',
   },
   {
      id: 'client_6',
      name: 'Sofía Ramírez',
      phone: '555-1006',
      email: 'sofia.ramirez@ejemplo.com',
   },
   {
      id: 'client_7',
      name: 'Diego Fernández',
      phone: '555-1007',
      email: 'diego.fernandez@ejemplo.com',
   },
   {
      id: 'client_8',
      name: 'Laura Torres',
      phone: '555-1008',
      email: 'laura.torres@ejemplo.com',
   },
   {
      id: 'client_9',
      name: 'Pablo Sánchez',
      phone: '555-1009',
      email: 'pablo.sanchez@ejemplo.com',
   },
   {
      id: 'client_10',
      name: 'Valentina Díaz',
      phone: '555-1010',
      email: 'valentina.diaz@ejemplo.com',
   },
   {
      id: 'client_11',
      name: 'Bruno Castro',
      phone: '555-1011',
      email: 'bruno.castro@ejemplo.com',
   },
   {
      id: 'client_12',
      name: 'Lucía Méndez',
      phone: '555-1012',
      email: 'lucia.mendez@ejemplo.com',
   },
   {
      id: 'client_13',
      name: 'Martín Núñez',
      phone: '555-1013',
      email: 'martin.nunez@ejemplo.com',
   },
   {
      id: 'client_14',
      name: 'Florencia Rivas',
      phone: '555-1014',
      email: 'florencia.rivas@ejemplo.com',
   },
   {
      id: 'client_15',
      name: 'Tomás Herrera',
      phone: '555-1015',
      email: 'tomas.herrera@ejemplo.com',
   },
]
