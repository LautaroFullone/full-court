import { OctagonAlert } from 'lucide-react'
import {
   Label,
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@shadcn'
import { FieldErrors } from 'react-hook-form'

interface SelectOption {
   label: string
   value: string
}

interface SelectFormProps {
   name: string
   label: string
   value: string
   onChange: (value: string) => void
   options: SelectOption[]
   placeholder?: string
   errors?: FieldErrors
   className?: string
}

const SelectForm: React.FC<SelectFormProps> = ({
   name,
   label,
   value,
   onChange,
   options,
   placeholder = 'Selecciona una opción',
   errors = {},
   className = '',
}) => {
   const fieldError = name.split('.').reduce((acc, key) => acc?.[key], errors as any)
   const hasError = !!fieldError

   return (
      <div>
         <Label htmlFor={name} className="mb-2">
            {label}
         </Label>

         <Select value={value} onValueChange={onChange}>
            <SelectTrigger
               id={`select-${name}`}
               className={`w-full shadow-xs ${
                  hasError ? 'border-red-500 focus:ring-red-500' : ''
               } ${className}`}
            >
               <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
               {options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                     {opt.label}
                  </SelectItem>
               ))}
            </SelectContent>
         </Select>

         {hasError && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
               <OctagonAlert size={13} />
               {fieldError.message}
            </p>
         )}
      </div>
   )
}

export default SelectForm
