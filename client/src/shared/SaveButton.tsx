import { Loader2 } from 'lucide-react'
import { useMobile } from '@hooks'
import { Button } from '@shadcn'

const modelLabels = {
   client: 'cliente',
   reservation: 'reserva',
   product: 'producto',
}

const actionLabels = {
   create: 'Guardando...',
   update: 'Actualizando...',
   delete: 'Eliminando...',
   cancel: 'Cancelando...',
}

interface SaveButtonProps {
   disabled?: boolean
   isLoading: boolean
   variant?: 'default' | 'destructive' | 'outline'
   action: keyof typeof actionLabels
   model: keyof typeof modelLabels
   onClick: () => void
   className?: string
}

const SaveButton: React.FC<SaveButtonProps> = ({
   disabled,
   isLoading,
   variant = 'default',
   action,
   model,
   className = '',
   onClick,
   ...props
}) => {
   const isMobile = useMobile()

   const label = `${
      action === 'create'
         ? 'Guardar'
         : action === 'update'
         ? 'Actualizar'
         : action === 'cancel'
         ? 'Si, cancelar'
         : 'Si, eliminar'
   } ${modelLabels[model]}`

   const loadingLabel = actionLabels[action]

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
               {loadingLabel}
            </>
         ) : (
            label
         )}
      </Button>
   )
}
export default SaveButton
