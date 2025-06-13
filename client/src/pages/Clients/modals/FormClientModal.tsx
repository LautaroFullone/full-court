import { useCreateClient, useMobile, useUpdateClient } from '@hooks'
import { useAppStore, useModalStore } from '@stores'
import { InputForm, SaveButton } from '@shared'
import { useForm } from 'react-hook-form'
import { ClientFormData } from '@models'
import { clientResolver } from '@lib'
import { useEffect } from 'react'
import {
   Button,
   DialogClose,
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
   const currentModal = useModalStore((state) => state.currentModal)
   const closeModal = useModalStore((state) => state.modalActions.closeModal)

   const isMobile = useMobile()
   const { createClientMutate, isLoading: isCreateLoading } = useCreateClient()
   const { updateClientMutate, isLoading: isUpdateLoading } = useUpdateClient()

   const {
      register,
      reset: resetForm,
      handleSubmit: handleFormSubmit,
      formState: { errors, isValid },
   } = useForm<ClientFormData>({
      mode: 'onChange',
      resolver: clientResolver,
      defaultValues: initialFormData,
   })

   const isEditMode = currentModal?.name === 'edit-client'
   const isLoading = isCreateLoading || isUpdateLoading

   useEffect(() => {
      if (isEditMode && selectedClient) {
         resetForm({
            name: selectedClient.name,
            dni: selectedClient.dni,
            phone: selectedClient.phone,
            email: selectedClient?.email,
         })
      }
      // eslint-disable-next-line
   }, [isEditMode, selectedClient])

   async function onSubmit(formData: ClientFormData) {
      console.log('# submit: ', formData)
      const sanitizedData = {
         ...formData,
         email: formData.email?.trim() || '',
      }
      if (isEditMode && selectedClient) {
         await updateClientMutate({
            clientID: selectedClient.id,
            clientData: sanitizedData,
         })
         closeModal('edit-client')
      } else {
         await createClientMutate(formData)
         closeModal('create-client')
      }

      resetForm(initialFormData)
   }

   return (
      <>
         <DialogHeader>
            <DialogTitle>{!isEditMode ? 'Agregar nuevo' : 'Editar '} Cliente</DialogTitle>

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
                  type="text"
                  placeholder="Ej: Valentina Roldan"
                  disabled={isLoading}
                  register={register('name')}
                  errors={errors}
               />
            </div>

            <div className="space-y-2">
               <InputForm
                  label="DNI / Documento"
                  name="dni"
                  type="number"
                  placeholder="Ej: 4433229"
                  disabled={isLoading}
                  register={register('dni')}
                  errors={errors}
               />
            </div>

            <div className="space-y-2">
               <InputForm
                  label="Celular"
                  name="client.phone"
                  type="number"
                  placeholder="Ej: 2236839493"
                  disabled={isLoading}
                  register={register('phone')}
                  errors={errors}
               />
            </div>

            <div className="space-y-2">
               <InputForm
                  label="Email (opcional)"
                  name="email"
                  type="email"
                  placeholder="Ej: valentinaroldan@ejemplo.com"
                  disabled={isLoading}
                  register={register('email')}
                  errors={errors}
               />
            </div>
         </div>

         <DialogFooter className={isMobile ? 'flex-col space-y-2' : ''}>
            <DialogClose asChild>
               <Button
                  size="lg"
                  variant="outline"
                  disabled={!isValid || isLoading}
                  className={isMobile ? 'w-full' : ''}
               >
                  Cancelar
               </Button>
            </DialogClose>

            <SaveButton
               model="client"
               isLoading={isLoading}
               onClick={handleFormSubmit(onSubmit)}
               disabled={!isValid || isLoading}
               action={isEditMode ? 'update' : 'create'}
            />
         </DialogFooter>
      </>
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
