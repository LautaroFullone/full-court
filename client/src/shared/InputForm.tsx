import { InputHTMLAttributes } from 'react'
import { OctagonAlert } from 'lucide-react'
import { Input, Label } from '@shadcn'

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
   name: string
   label: string
   errors?: Record<string, string>
   isCurrency?: boolean
}

const InputForm: React.FC<InputFormProps> = ({
   name,
   value,
   label,
   type,
   onChange,
   placeholder,
   className = '',
   errors = {},
   isCurrency = false,
   ...props
}: InputFormProps) => {
   const hasError = !!errors[name]

   return (
      <>
         <Label htmlFor={name}>{label}</Label>
         <div className="relative">
            {isCurrency && value && (
               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  $
               </span>
            )}
            <Input
               id={`input-${name}`}
               name={name}
               value={value}
               type={type}
               onChange={onChange}
               placeholder={placeholder}
               className={`mb-0 ${isCurrency && value && 'pl-6'}
                  ${
                     hasError
                        ? 'border-red-500 focus:border-0 focus-visible:ring-red-500'
                        : ''
                  } ${className}`}
               {...props}
            />
         </div>
         {hasError && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
               <OctagonAlert size={13} />
               {errors[name]}
            </p>
         )}
      </>
   )
}

export default InputForm
