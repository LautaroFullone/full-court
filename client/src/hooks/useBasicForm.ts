import { useState } from 'react'
import { ZodError } from 'zod'
import { clientFormValidation, productFormValidation } from '@models'

const schemaMap = {
   client: clientFormValidation,
   product: productFormValidation,
}

const useBasicForm = <T>(initialState: T, modelSchema?: keyof typeof schemaMap) => {
   const [formData, setFormData] = useState<T>(initialState)
   const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

   const schema = modelSchema ? schemaMap[modelSchema] : undefined

   function handleChange<K extends keyof T>(field: K, value: T[K]) {
      const formDataUpdated = { ...formData, [field]: value }
      setFormData(formDataUpdated)

      if (schema) {
         try {
            schema.parse(formDataUpdated)
            setErrors((prev) => ({ ...prev, [field]: '' }))
         } catch (err) {
            const zodErr = err as ZodError<T>
            const fieldErr = zodErr.errors.find((e) => e.path[0] === field)
            setErrors((prev) => ({
               ...prev,
               [field]: fieldErr?.message || '',
            }))
         }
      }
   }

   function resetForm() {
      setFormData(initialState)
      setErrors({})
   }

   const isValid = schema?.safeParse(formData).success ?? true

   return { formData, handleChange, resetForm, setFormData, isValid, errors }
}

export default useBasicForm
