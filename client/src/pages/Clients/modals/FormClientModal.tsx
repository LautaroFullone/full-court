import { useBasicForm, useClientMutation, useMobile } from '@hooks'
import { ClientFormData, clientValidationSchema } from '@models'
import { InputHTMLAttributes, useEffect } from 'react'
import { useAppStore, useModalStore } from '@stores'
import { Loader2, OctagonAlert } from 'lucide-react'
import {
   Button,
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   Input,
   Label,
} from '@shadcn'

const initialFormData: ClientFormData = {
   name: '',
   dni: '',
   phone: '',
   email: '',
}

interface InputFormClient extends InputHTMLAttributes<HTMLInputElement> {
   name: keyof ClientFormData
   label: string
   errors?: Record<string, string>
}

const InputClientForm: React.FC<InputFormClient> = ({
   name,
   value,
   label,
   onChange,
   placeholder,
   className = '',
   errors = {},
   ...props
}) => {
   const hasError = !!errors[name]

   return (
      <>
         <Label htmlFor={name}>{label}</Label>
         <Input
            id={`input-client-${name}`}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`mb-0 ${
               hasError && 'border-red-500 focus:border-0 focus-visible:ring-red-500'
            } ${className}`}
            {...props}
         />

         {hasError && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
               <OctagonAlert size={13} />
               {errors[name]}
            </p>
         )}
      </>
   )
}

const FormClientModal = () => {
   const selectedClient = useAppStore((state) => state.selectedClient)
   const modalFlags = useModalStore((state) => state.modalFlags)
   const closeModal = useModalStore((state) => state.modalActions.closeModal)

   const isMobile = useMobile()
   const { createClientMutation, isLoading } = useClientMutation()

   const { formData, handleChange, setFormData, resetForm, errors, isValid } =
      useBasicForm(initialFormData, clientValidationSchema)

   const isEditMode = modalFlags['edit-client']

   useEffect(() => {
      if (isEditMode && selectedClient) {
         setFormData({
            name: selectedClient.name,
            dni: selectedClient.dni,
            phone: selectedClient.phone,
            email: selectedClient?.email,
         })
      } else {
         resetForm()
      }
      // eslint-disable-next-line
   }, [isEditMode])

   async function handleSubmit() {
      await createClientMutation(formData)
      closeModal(isEditMode ? 'edit-client' : 'new-client')
      resetForm()
   }

   return (
      <Dialog
         open={modalFlags['new-client'] || modalFlags['edit-client']}
         onOpenChange={() =>
            isEditMode ? closeModal('edit-client') : closeModal('new-client')
         }
      >
         <DialogContent className="w-[400px]">
            <DialogHeader>
               <DialogTitle>
                  {!isEditMode ? 'Agregar nuevo' : 'Editar '} Cliente
               </DialogTitle>

               <DialogDescription>
                  {!isEditMode
                     ? 'Ingresa la información del cliente'
                     : 'Actualiza la información del cliente'}
               </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
               <div className="space-y-2">
                  <InputClientForm
                     label="Nombre Completo"
                     name="name"
                     value={formData.name}
                     onChange={(evt) => handleChange('name', evt.target.value)}
                     placeholder="Ej: Valentina Roldan"
                     disabled={isLoading}
                     errors={errors}
                  />
               </div>

               <div className="space-y-2">
                  <InputClientForm
                     label="DNI / Documento"
                     name="dni"
                     type="number"
                     value={formData.dni}
                     onChange={(evt) => handleChange('dni', evt.target.value)}
                     placeholder="Ej: 4433229"
                     disabled={isLoading}
                     errors={errors}
                  />
               </div>

               <div className="space-y-2">
                  <InputClientForm
                     label="Celular"
                     name="phone"
                     type="number"
                     value={formData.phone}
                     onChange={(evt) => handleChange('phone', evt.target.value)}
                     placeholder="Ej: 555-1234"
                     disabled={isLoading}
                     errors={errors}
                  />
               </div>

               <div className="space-y-2">
                  <InputClientForm
                     label="Email (opcional)"
                     name="email"
                     type="email"
                     value={formData.email}
                     onChange={(evt) => handleChange('email', evt.target.value)}
                     placeholder="Ej: valentinaroldan@ejemplo.com"
                     disabled={isLoading}
                     errors={errors}
                  />
               </div>
            </div>

            <DialogFooter className={isMobile ? 'flex-col space-y-2' : ''}>
               <DialogClose asChild>
                  <Button
                     variant="outline"
                     size="lg"
                     className={isMobile ? 'w-full' : ''}
                  >
                     Cancelar
                  </Button>
               </DialogClose>

               <Button
                  onClick={handleSubmit}
                  disabled={!isValid}
                  size="lg"
                  className={isMobile ? 'w-full' : ''}
               >
                  {isLoading ? (
                     <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Guardando...
                     </>
                  ) : (
                     'Guardar Cliente'
                  )}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
export default FormClientModal

//OTRA VARIANTE PARA LOADING
{
   /* 
   
      <div className="absolute inset-0 bg-background/50 backdrop-blur-md z-10 flex items-center justify-center rounded-lg">
         <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <div className="text-center">
               <p className="text-sm font-medium">Guardando cliente...</p>
               <p className="text-xs text-muted-foreground">
                  Por favor espera un momento
               </p>
            </div>
         </div>
      </div> 
   */
}
