import { RESERVATION_TYPES_VALUES, ReservationFormData } from '@models'
import { formatDateToString, reservationResolver } from '@lib'
import { useAppStore, useModalStore } from '@stores'
import { InputForm, SaveButton } from '@shared'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { COURTS } from '@config'
import {
   Button,
   DialogClose,
   DialogContent,
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

const FormReservationModal: React.FC = () => {
   const selectedDate = useAppStore((state) => state.selectedDate)
   const selectedCourt = useAppStore((state) => state.selectedCourt)
   const selectedShift = useAppStore((state) => state.selectedShift)
   const selectedReservation = useAppStore((state) => state.selectedReservation)
   const dispatchSelectedReservation = useAppStore(
      (state) => state.appActions.dispatchSelectedReservation
   )
   const currentModal = useModalStore((state) => state.currentModal)
   const closeModal = useModalStore((state) => state.modalActions.closeModal)

   const isMobile = useMobile()
   const { clients, isPending } = useFetchClients()
   const { createReservationMutate, isLoading: isCreateLoading } = useCreateReservation()
   const { updateReservationMutate, isLoading: isUpdateLoading } = useUpdateReservation()

   const [searchTerm, setSearchTerm] = useState<string>('')

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

   const filteredClients = useMemo(() => {
      const term = searchTerm.toLowerCase()
      let list = clients.filter((client) => client.name.toLowerCase().includes(term))

      if (isEditMode && selectedReservation) {
         const ownerID = selectedReservation.owner.id
         const selectedClient = clients.find((c) => c.id === ownerID)

         if (selectedClient) {
            list = [selectedClient, ...list.filter((c) => c.id !== ownerID)]
         }
      }

      return list
   }, [clients, searchTerm, isEditMode, selectedReservation])

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

   const formatedDate = useMemo(
      () => formatDateToString(selectedDate, true),
      [selectedDate]
   )

   function getCourtName(courtID: string | undefined) {
      return COURTS.find((c) => c.id === courtID)?.name || ''
   }

   async function onSubmit(formData: ReservationFormData) {
      if (isEditMode && selectedReservation) {
         console.log('## edit res: ', formData)
         await updateReservationMutate({
            reservationID: selectedReservation.id,
            reservationData: formData,
         })

         closeModal('edit-reservation')
         dispatchSelectedReservation(null)
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
      <DialogContent className=" sm:max-w-2xl w-[95%] max-w-[95%]">
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
                     disabled={isPending}
                     className="m-0"
                     onChange={(evt) => setSearchTerm(evt.target.value)}
                  />
               </div>

               <div className="border rounded-md p-4 h-[150px] overflow-y-auto">
                  <input type="hidden" {...register('client.id')} />

                  {filteredClients.map((client) => (
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
                  ))}
               </div>
            </TabsContent>
         </Tabs>

         <DialogFooter className={`${isMobile ? 'flex-col space-y-2' : ''}`}>
            <DialogClose asChild>
               <Button
                  // id="boton-de-prueba"
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
      </DialogContent>
   )
}

export default FormReservationModal
