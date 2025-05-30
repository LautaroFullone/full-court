import { useBasicForm, useCreateClient, useMobile, useUpdateClient } from '@hooks'
import { useAppStore, useModalStore } from '@stores'
import { ClientFormData } from '@models'
import { Loader2 } from 'lucide-react'
import { InputForm } from '@shared'
import { useEffect } from 'react'
import {
   Button,
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@shadcn'

const initialFormData: ClientFormData = {
   name: '',
   dni: '',
   phone: '',
   email: '',
}

const FormClientModal = () => {
   const selectedClient = useAppStore((state) => state.selectedClient)
   const modalFlags = useModalStore((state) => state.modalFlags)
   const closeModal = useModalStore((state) => state.modalActions.closeModal)

   const isMobile = useMobile()
   const { createClientMutate, isLoading: isCreateLoading } = useCreateClient()
   const { updateClientMutate, isLoading: isUpdateLoading } = useUpdateClient()

   const { formData, handleChange, setFormData, resetForm, errors, isValid } =
      useBasicForm(initialFormData, 'client')

   const isEditMode = modalFlags['edit-client']
   const isLoading = isCreateLoading || isUpdateLoading

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
      if (isEditMode && selectedClient) {
         await updateClientMutate({ clientID: selectedClient.id, clientData: formData })
         closeModal('edit-client')
      } else {
         await createClientMutate(formData)
         closeModal('create-client')
      }

      resetForm()
   }

   return (
      <Dialog
         open={modalFlags['create-client'] || modalFlags['edit-client']}
         onOpenChange={() =>
            isEditMode ? closeModal('edit-client') : closeModal('create-client')
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
                  <InputForm
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
                  <InputForm
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
                  <InputForm
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
                  <InputForm
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
                  size="lg"
                  disabled={!isValid}
                  onClick={handleSubmit}
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
