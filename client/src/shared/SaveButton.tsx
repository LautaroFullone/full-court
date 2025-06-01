import { Loader2 } from 'lucide-react'
import { useMobile } from '@hooks'
import { Button } from '@shadcn'

const modelLabels = {
   client: 'Cliente',
   reservation: 'Reserva',
   product: 'Producto',
}

interface SaveButtonProps {
   disabled?: boolean
   isLoading: boolean
   variant?: 'default' | 'destructive' | 'outline'
   model: keyof typeof modelLabels
   onClick: () => void
   className?: string
}

const SaveButton: React.FC<SaveButtonProps> = ({
   disabled,
   isLoading,
   variant = 'default',
   model,
   className = '',
   onClick,
   ...props
}) => {
   const isMobile = useMobile()

   const label = `Guardar ${modelLabels[model]}`

   return (
      <Button
         size="lg"
         variant={variant}
         disabled={disabled}
         onClick={onClick}
         className={`${isMobile ? 'w-full' : ''} ${className}`}
         {...props}
      >
         {isLoading ? (
            <>
               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
               Guardando...
            </>
         ) : (
            label
         )}
      </Button>
   )
}
export default SaveButton
