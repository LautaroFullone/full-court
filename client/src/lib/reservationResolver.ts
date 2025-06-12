import { Resolver } from 'react-hook-form'
import { ReservationFormData } from '@models'

export const reservationResolver: Resolver<ReservationFormData> = async (values) => {
   const errors: Record<string, object> = {}

   if (values.clientType === 'new-client') {
      if (!values.client.name?.trim()) {
         errors['client.name'] = { type: 'required', message: 'El nombre es obligatorio' }
      } else if (values.client.name?.length < 3) {
         errors['client.name'] = {
            type: 'minLength',
            message: 'Debe tener al menos 3 caracteres',
         }
      } else if (values.client.name?.length > 50) {
         errors['client.name'] = {
            type: 'maxLength',
            message: 'No puede superar los 50 caracteres',
         }
      }

      if (!values.client.dni?.trim()) {
         errors['client.dni'] = { type: 'required', message: 'El DNI es obligatorio' }
      } else if (!/^\d+$/.test(values.client.dni)) {
         errors['client.dni'] = { type: 'pattern', message: 'Solo debe contener números' }
      } else if (values.client.dni?.length < 6) {
         errors['client.dni'] = {
            type: 'maxLength',
            message: 'Debe tener al menos 6 dígitos',
         }
      } else if (values.client.dni.length > 10) {
         errors['client.dni'] = {
            type: 'maxLength',
            message: 'No puede superar los 10 caracteres',
         }
      }

      if (!values.client.phone?.trim()) {
         errors['client.phone'] = {
            type: 'required',
            message: 'El celular es obligatorio',
         }
      } else if (!/^\d+$/.test(values.client.phone)) {
         errors['client.phone'] = {
            type: 'pattern',
            message: 'Solo deb contener números',
         }
      } else if (values.client.phone?.length < 6) {
         errors['client.phone'] = {
            type: 'maxLength',
            message: 'Debe tener al menos 6 dígitos',
         }
      } else if (values.client.phone.length > 20) {
         errors['client.phone'] = {
            type: 'maxLength',
            message: 'No puede superar los 20 caracteres',
         }
      }
   }

   if (values.clientType === 'existing-client') {
      if (!values.client.id) {
         errors['client.id'] = {
            type: 'required',
            message: 'Debés seleccionar un cliente',
         }
      }
   }

   return {
      values,
      errors,
   }
}
