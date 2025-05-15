import { useState } from 'react'

const useBasicForm = <T>(initialState: T) => {
   const [formData, setFormData] = useState<T>(initialState)

   function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
      const { name, value } = evt.target
      setFormData((prevData) => ({
         ...prevData,
         [name]: value,
      }))
   }

   function resetForm() {
      setFormData(initialState)
   }

   return { formData, handleChange, resetForm, setFormData }
}

export default useBasicForm
