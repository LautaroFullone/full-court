import { ZodError, ZodSchema } from 'zod'
import { useState } from 'react'

const useBasicForm = <T>(initialState: T, validationSchema?: ZodSchema<T>) => {
   const [formData, setFormData] = useState<T>(initialState)
   const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

   function handleChange<K extends keyof T>(field: K, value: T[K]) {
      const formDataUpdated = { ...formData, [field]: value }
      setFormData(formDataUpdated)

      if (validationSchema) {
         try {
            validationSchema.parse(formDataUpdated)
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

   const isValid = validationSchema?.safeParse(formData).success ?? true

   return { formData, handleChange, resetForm, setFormData, isValid, errors }
}

export default useBasicForm
