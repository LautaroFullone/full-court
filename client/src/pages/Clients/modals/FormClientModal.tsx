import { useBasicForm, useClientMutation, useMobile } from '@hooks'
import { ClientFormData, clientValidationSchema } from '@models'
import { InputHTMLAttributes, useEffect } from 'react'
import { useAppStore, useModalStore } from '@stores'
import { OctagonAlert } from 'lucide-react'
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
            {/* <div className="absolute inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center rounded-md">
               <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div> */}

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
                     errors={errors}
                  />
               </div>

               <div className="space-y-2">
                  <InputClientForm
                     label="Teléfono"
                     name="phone"
                     type="number"
                     value={formData.phone}
                     onChange={(evt) => handleChange('phone', evt.target.value)}
                     placeholder="Ej: 555-1234"
                     errors={errors}
                  />
               </div>

               <div className="space-y-2">
                  <InputClientForm
                     label="Email"
                     name="email"
                     type="email"
                     value={formData.email}
                     onChange={(evt) => handleChange('email', evt.target.value)}
                     placeholder="Ej: valentinaroldan@ejemplo.com"
                     errors={errors}
                  />
               </div>
            </div>

            <DialogFooter className={isMobile ? 'flex-col space-y-2' : ''}>
               <DialogClose asChild>
                  <Button variant="outline" className={isMobile ? 'w-full' : ''}>
                     Cancelar
                  </Button>
               </DialogClose>

               <Button
                  onClick={handleSubmit}
                  disabled={!isValid}
                  className={isMobile ? 'w-full' : ''}
               >
                  Guardar Cliente
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
export default FormClientModal
