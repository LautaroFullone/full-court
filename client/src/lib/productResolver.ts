import { Resolver } from 'react-hook-form'
import { ProductFormData } from '@models'

export const productResolver: Resolver<ProductFormData> = async (values) => {
   const errors: Record<string, object> = {}

   if (!values.name?.trim()) {
      errors.name = { type: 'required', message: 'El nombre es obligatorio' }
   } else if (values.name.length > 50) {
      errors.name = {
         type: 'maxLength',
         message: 'El nombre no puede superar los 50 caracteres',
      }
   }

   if (!String(values.price)?.trim()) {
      errors.price = { type: 'required', message: 'El precio es obligatorio' }
   } else if (!/^\d+$/.test(String(values.price))) {
      errors.price = {
         type: 'pattern',
         message: 'El precio debe ser un número entero positivo',
      }
   }

   if (!String(values.stock)?.trim()) {
      errors.stock = { type: 'required', message: 'El stock es obligatorio' }
   } else if (!/^\d+$/.test(String(values.stock))) {
      errors.stock = {
         type: 'pattern',
         message: 'El stock debe ser un número entero positivo',
      }
   }

   if (!values.category?.trim()) {
      errors.category = { type: 'required', message: 'La categoría es obligatoria' }
   }

   return {
      values,
      errors,
   }
}
