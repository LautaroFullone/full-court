import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form'
import { InputHTMLAttributes } from 'react'
import { OctagonAlert } from 'lucide-react'
import { Input, Label } from '@shadcn'

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
   name: string
   label: string
   register?: UseFormRegisterReturn
   errors?: FieldErrors
   isCurrency?: boolean
}

const InputForm: React.FC<InputFormProps> = ({
   name,
   label,
   register,
   errors = {},
   isCurrency = false,
   placeholder,
   className = '',
   value,
   ...props
}) => {
   // eslint-disable-next-line
   const fieldError = name.split('.').reduce((acc, key) => acc?.[key], errors as any)
   const hasError = !!fieldError

   const currencyAvaliable = isCurrency && value

   return (
      <div className="space-y-2">
         <Label htmlFor={name}>{label}</Label>
         <div className="relative">
            {currencyAvaliable && (
               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  $
               </span>
            )}
            <Input
               value={value}
               id={`input-${name}`}
               placeholder={placeholder}
               className={`mb-0 ${currencyAvaliable ? 'pl-6' : ''} ${
                  hasError
                     ? 'border-red-500 focus:border-0 focus-visible:ring-red-500'
                     : ''
               } ${className}`}
               {...register}
               {...props}
            />
         </div>

         {hasError && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
               <OctagonAlert size={13} />
               {fieldError.message}
            </p>
         )}
      </div>
   )
}

export default InputForm
