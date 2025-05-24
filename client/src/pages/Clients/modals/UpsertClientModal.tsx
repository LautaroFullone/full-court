import { useBasicForm, useMobile } from '@hooks'
import { useAppStore, useModalStore } from '@stores'
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
import { useEffect } from 'react'

const initialFormData = {
   name: '',
   dni: '',
   phone: '',
   email: '',
}

const UpsertClientModal = () => {
   const isMobile = useMobile()
   const { formData, handleChange, setFormData, resetForm } =
      useBasicForm(initialFormData)
   const selectedClient = useAppStore((state) => state.selectedClient)
   const dispatchSelectedClient = useAppStore(
      (state) => state.appActions.dispatchSelectedClient
   )
   const modalFlags = useModalStore((state) => state.modalFlags)
   const modalActions = useModalStore((state) => state.modalActions)

   const isEditMode = modalFlags['edit-client']
   console.log('isEditMode', isEditMode)

   useEffect(() => {
      if (!isEditMode) return

      if (selectedClient) {
         setFormData({
            name: selectedClient.name || '',
            dni: selectedClient.dni || '',
            phone: selectedClient.phone || '',
            email: selectedClient.email || '',
         })
      } else {
         resetForm()
      }
      // eslint-disable-next-line
   }, [modalFlags['edit-client']])

   return (
      <Dialog
         open={modalFlags['new-client'] || modalFlags['edit-client']}
         onOpenChange={() =>
            isEditMode
               ? modalActions.closeModal('edit-client')
               : modalActions.closeModal('new-client')
         }
      >
         <DialogContent className="w-[95%] max-w-[95%] sm:w-auto sm:max-w-md">
            <DialogHeader>
               <DialogTitle>
                  {!isEditMode ? 'Agregar nuevo' : 'Editar '} Cliente
               </DialogTitle>
               <DialogDescription>
                  {!isEditMode
                     ? 'Ingresa la información del nuevo cliente'
                     : 'Actualiza la información del cliente'}
               </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
               <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                     name="name"
                     value={formData.name}
                     onChange={(evt) => handleChange('name', evt.target.value)}
                     placeholder="Ej: Valentina Roldan"
                  />
               </div>

               <div className="space-y-2">
                  <Label htmlFor="dni">DNI / Documento</Label>
                  <Input
                     id="dni"
                     name="dni"
                     value={formData.dni}
                     onChange={(evt) => handleChange('dni', evt.target.value)}
                     placeholder="Ej: 4433229"
                  />
               </div>

               <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                     id="phone"
                     name="phone"
                     value={formData.phone}
                     onChange={(evt) => handleChange('phone', evt.target.value)}
                     placeholder="Ej: 223-8571833"
                  />
               </div>

               <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                     id="email"
                     name="email"
                     type="email"
                     value={formData.email}
                     onChange={(evt) => handleChange('email', evt.target.value)}
                     placeholder="Ej: valentinaroldan@ejemplo.com"
                  />
               </div>
            </div>

            <DialogFooter className={isMobile ? 'flex-col space-y-2' : ''}>
               <DialogClose asChild>
                  <Button variant="outline" className={isMobile ? 'w-full' : ''}>
                     Cancelar
                  </Button>
               </DialogClose>

               <Button type="submit" className={isMobile ? 'w-full' : ''}>
                  Guardar Cliente
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
export default UpsertClientModal
