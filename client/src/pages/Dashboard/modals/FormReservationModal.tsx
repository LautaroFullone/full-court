import { RESERVATION_TYPES_VALUES, ReservationFormData } from '@models'
import { formatDateToString, reservationResolver } from '@lib'
import { useAppStore, useModalStore } from '@stores'
import { InputForm, SaveButton } from '@shared'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Loader2 } from 'lucide-react'
import { COURTS } from '@config'
import {
   Button,
   DialogClose,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   Input,
   Label,
   RadioGroup,
   RadioGroupItem,
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from '@shadcn'
import {
   useCreateReservation,
   useFetchClients,
   useMobile,
   useSearchFilter,
   useUpdateReservation,
} from '@hooks'

const initialFormData: ReservationFormData = {
   type: 'clase',
   clientType: 'new-client',
   client: {
      id: '',
      dni: '',
      name: '',
      phone: '',
   },
}

const FormReservationModal = () => {
   const selectedDate = useAppStore((state) => state.selectedDate)
   const selectedCourt = useAppStore((state) => state.selectedCourt)
   const selectedShift = useAppStore((state) => state.selectedShift)
   const selectedReservation = useAppStore((state) => state.selectedReservation)

   const currentModal = useModalStore((state) => state.currentModal)
   const closeModal = useModalStore((state) => state.modalActions.closeModal)

   const isMobile = useMobile()
   const { clients, isPending } = useFetchClients()
   const { createReservationMutate, isLoading: isCreateLoading } = useCreateReservation()
   const { updateReservationMutate, isLoading: isUpdateLoading } = useUpdateReservation()

   const {
      searchTerm,
      setSearchTerm,
      filteredValues: filteredClients,
   } = useSearchFilter(clients, ['name', 'dni', 'phone'])

   const {
      watch,
      setValue,
      register,
      reset: resetForm,
      handleSubmit: handleFormSubmit,
      formState: { errors, isValid },
   } = useForm<ReservationFormData>({
      mode: 'onChange',
      resolver: reservationResolver,
      defaultValues: initialFormData,
   })

   const isEditMode = currentModal?.name === 'edit-reservation'
   const isLoading = isCreateLoading || isUpdateLoading
   const existsClients = Boolean(clients.length > 0)
   console.log('existsClients', existsClients)

   const filteredClientsWithOwner = useMemo(() => {
      if (isEditMode && selectedReservation) {
         const selectedClient = clients.find((c) => c.id === selectedReservation.owner.id)

         if (selectedClient) {
            return [
               selectedClient,
               ...filteredClients.filter((c) => c.id !== selectedClient.id),
            ]
         }
      }

      return filteredClients
      // eslint-disable-next-line
   }, [filteredClients, isEditMode, selectedReservation])

   console.log('filteredClients', filteredClients)
   console.log('filteredClientsWithOwner', filteredClientsWithOwner)
   const formatedDate = useMemo(
      () => formatDateToString(selectedDate, true),
      [selectedDate]
   )

   function getCourtName(courtID: string | undefined) {
      return COURTS.find((c) => c.id === courtID)?.name || ''
   }

   useEffect(() => {
      if (isEditMode && selectedReservation) {
         resetForm({
            type: selectedReservation.type,
            clientType: 'existing-client',
            client: {
               id: selectedReservation.owner.id || '',
               name: selectedReservation.owner.name || '',
               dni: selectedReservation.owner.dni || '',
               phone: selectedReservation.owner.phone || '',
            },
         })
      }
      // eslint-disable-next-line
   }, [isEditMode, selectedReservation])

   async function onSubmit(formData: ReservationFormData) {
      if (isEditMode && selectedReservation) {
         await updateReservationMutate({
            reservationID: selectedReservation.id,
            reservationData: formData,
         })

         closeModal('edit-reservation')
      } else if (selectedCourt && selectedShift) {
         const { client } = formData
         const clientData =
            formData.clientType === 'new-client'
               ? { name: client.name, dni: client.dni, phone: client.phone }
               : { id: watch('client.id') }

         await createReservationMutate({
            date: formatDateToString(selectedDate),
            shift: selectedShift!,
            courtID: selectedCourt.id,
            type: formData.type,
            clientType: formData.clientType,
            client: clientData,
         })

         closeModal('create-reservation')
      }
      resetForm(initialFormData)
   }

   return (
      <>
         <DialogHeader>
            <DialogTitle>Nueva Reserva</DialogTitle>
            <DialogDescription className="capitalize">{formatedDate}</DialogDescription>
         </DialogHeader>

         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            <InputForm
               readOnly
               label="Cancha"
               name="courtName"
               value={
                  isEditMode
                     ? getCourtName(selectedReservation?.courtId)
                     : selectedCourt?.name
               }
               className="bg-muted/50"
            />

            <InputForm
               readOnly
               label="Horario"
               name="shift"
               value={isEditMode ? selectedReservation?.shift : String(selectedShift)}
               className="bg-muted/50"
            />
         </div>

         <div className="space-y-2 mt-2">
            <Label>Tipo de Reserva</Label>
            <RadioGroup
               defaultValue="partido"
               value={watch('type')}
               onValueChange={(value) =>
                  setValue('type', value as ReservationFormData['type'])
               }
               className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
               {RESERVATION_TYPES_VALUES.map((type) => (
                  <div key={`reservation-type-${type}`}>
                     <RadioGroupItem value={type} id={type} className="peer sr-only" />
                     <Label
                        htmlFor={type}
                        className="flex flex-col items-center justify-between
                                    rounded-md border-2 border-muted bg-popover p-4
                                    hover:bg-accent hover:text-accent-foreground
                                    peer-data-[state=checked]:border-primary
                                    cursor-pointer capitalize"
                     >
                        {type}
                     </Label>
                  </div>
               ))}
            </RadioGroup>
         </div>

         <Tabs
            className="mt-2"
            value={watch('clientType')}
            onValueChange={(value) => {
               const newClientType = value as ReservationFormData['clientType']

               if (isEditMode) {
                  resetForm({
                     type: selectedReservation?.type ?? 'clase',
                     clientType: newClientType,
                     client: {
                        id:
                           newClientType === 'existing-client'
                              ? selectedReservation?.owner.id ?? ''
                              : '',
                        name: '',
                        dni: '',
                        phone: '',
                     },
                  })
               } else {
                  setValue('clientType', newClientType, {
                     shouldValidate: true,
                  })
               }
            }}
         >
            <TabsList className="grid w-full grid-cols-2">
               <TabsTrigger value="new-client" className="cursor-pointer">
                  Cliente Nuevo
               </TabsTrigger>

               <TabsTrigger value="existing-client" className="cursor-pointer">
                  Cliente Existente
               </TabsTrigger>
            </TabsList>

            <TabsContent value="new-client" className="space-y-4 mt-4">
               <InputForm
                  label="Nombre Completo"
                  name="client.name"
                  type="text"
                  placeholder="Ej: Valentina Roldán"
                  disabled={isLoading}
                  register={register('client.name')}
                  errors={errors}
               />

               <div className="space-y-2">
                  <InputForm
                     label="DNI / Documento"
                     name="client.dni"
                     type="number"
                     placeholder="Ej: 4433229"
                     disabled={isLoading}
                     register={register('client.dni')}
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
                     register={register('client.phone')}
                     errors={errors}
                  />
               </div>
            </TabsContent>

            <TabsContent value="existing-client" className="space-y-4 mt-4">
               <div className="space-y-2 mb-1">
                  <Label htmlFor="search-client">Buscar Cliente</Label>
                  <Input
                     id="search-client"
                     placeholder="Nombre, dni o celular"
                     value={searchTerm}
                     disabled={isPending || !existsClients}
                     className="m-0"
                     onChange={(evt) => setSearchTerm(evt.target.value)}
                  />
               </div>

               <div className="border rounded-md p-4 max-h-[150px] overflow-y-auto">
                  <input type="hidden" {...register('client.id')} />
                  {isPending ? (
                     <div className="flex items-center justify-center">
                        <div className="flex flex-col items-center justify-center">
                           <Loader2 className="h-8 w-8 animate-spin" />

                           <p className="text-sm text-muted-foreground mt-2">
                              Cargando clientes...
                           </p>
                        </div>
                     </div>
                  ) : clients.length === 0 ? (
                     <div className="flex items-center justify-center">
                        <p className="text-sm text-muted-foreground text-center">
                           No hay clientes registrados. <br />
                           <span
                              onClick={() => setValue('clientType', 'new-client')}
                              className="text-primary underline cursor-pointer"
                           >
                              Agregá tu primer cliente
                           </span>{' '}
                           para gestionar sus reservas y datos de contacto.
                        </p>
                     </div>
                  ) : filteredClientsWithOwner.length > 0 ? (
                     filteredClientsWithOwner.map((client) => (
                        <div
                           key={client.id}
                           className={`flex flex-col sm:flex-row sm:items-center
                                    justify-between p-2 hover:bg-primary/5 rounded-md
                                    cursor-pointer ${
                                       watch('client.id') === client.id && 'bg-primary/5'
                                    }`}
                        >
                           <div className="mb-2 sm:mb-0">
                              <div className="font-medium">{client.name}</div>
                              <div className="text-sm text-muted-foreground">
                                 {client.phone}
                              </div>
                           </div>

                           <Button
                              size="default"
                              className="w-full sm:w-auto"
                              variant={
                                 watch('client.id') === client.id ? 'default' : 'outline'
                              }
                              onClick={() =>
                                 setValue(
                                    'client.id',
                                    watch('client.id') === client.id ? '' : client.id,
                                    {
                                       shouldValidate: true,
                                    }
                                 )
                              }
                           >
                              {watch('client.id') === client.id
                                 ? 'Seleccionado'
                                 : 'Seleccionar'}
                           </Button>
                        </div>
                     ))
                  ) : (
                     <div className="flex items-center justify-center">
                        <p className="text-sm text-muted-foreground text-center">
                           No hay clientes que coincidan con "{searchTerm}" <br />
                           Intenta con otros términos de búsqueda.
                        </p>
                     </div>
                  )}
               </div>
            </TabsContent>
         </Tabs>

         <DialogFooter className={`${isMobile ? 'flex-col space-y-2' : ''}`}>
            <DialogClose asChild>
               <Button
                  size="lg"
                  variant="outline"
                  disabled={isLoading}
                  className={isMobile ? 'w-full' : ''}
               >
                  Cancelar
               </Button>
            </DialogClose>

            <SaveButton
               model="reservation"
               isLoading={isLoading}
               onClick={handleFormSubmit(onSubmit)}
               disabled={!isValid || isLoading}
               action={isEditMode ? 'update' : 'create'}
            />
         </DialogFooter>
      </>
   )
}

export default FormReservationModal
