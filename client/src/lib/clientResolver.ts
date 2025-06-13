import { Resolver } from 'react-hook-form'
import { ClientFormData } from '@models'

export const clientResolver: Resolver<ClientFormData> = async (values) => {
   const errors: Record<string, object> = {}

   if (!values.name?.trim()) {
      errors.name = { type: 'required', message: 'El nombre es obligatorio' }
   } else if (values.name.length > 50) {
      errors.name = {
         type: 'maxLength',
         message: 'El nombre no puede superar los 50 caracteres',
      }
   }

   if (!values.dni?.trim()) {
      errors.dni = { type: 'required', message: 'El DNI es obligatorio' }
   } else if (!/^\d+$/.test(values.dni)) {
      errors.dni = { type: 'pattern', message: 'El DNI debe contener solo números' }
   } else if (values.dni.length < 6) {
      errors.dni = {
         type: 'minLength',
         message: 'El DNI debe tener al menos 6 dígitos',
      }
   } else if (values.dni.length > 10) {
      errors.dni = {
         type: 'maxLength',
         message: 'El DNI no puede tener más de 10 dígitos',
      }
   }

   if (!values.phone?.trim()) {
      errors.phone = { type: 'required', message: 'El celular es obligatorio' }
   } else if (!/^\d+$/.test(values.phone)) {
      errors.phone = {
         type: 'pattern',
         message: 'El celular debe contener solo números',
      }
   } else if (values.phone.length < 6) {
      errors.phone = {
         type: 'minLength',
         message: 'El celular es obligatorio',
      }
   } else if (values.phone.length > 20) {
      errors.phone = {
         type: 'maxLength',
         message: 'El celular es demasiado largo',
      }
   }

   if (values.email && values.email.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(values.email)) {
         errors.email = {
            type: 'pattern',
            message: 'Debe ser un email válido',
         }
      }
   }

   return {
      values,
      errors,
   }
}
