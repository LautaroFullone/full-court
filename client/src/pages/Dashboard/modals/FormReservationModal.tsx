import { RESERVATION_TYPES_VALUES, ReservationFormData } from '@models'
import { formatDateToString, reservationResolver } from '@lib'
import { useAppStore, useModalStore } from '@stores'
import { InputForm, SaveButton } from '@shared'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
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
   RadioGroup,
   RadioGroupItem,
   ScrollArea,
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
   const modalFlags = useModalStore((state) => state.modalFlags)
   const closeModal = useModalStore((state) => state.modalActions.closeModal)

   const isMobile = useMobile()
   const { clients } = useFetchClients()
   const { createReservationMutate, isLoading: isCreateLoading } = useCreateReservation()
   const { updateReservationMutate, isLoading: isUpdateLoading } = useUpdateReservation()

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

   const isEditMode = modalFlags['edit-reservation']
   const isLoading = isCreateLoading || isUpdateLoading

   const formatedDate = useMemo(
      () => formatDateToString(selectedDate, true),
      [selectedDate]
   )

   async function onSubmit(formData: ReservationFormData) {
      if (isEditMode && selectedReservation) {
         await updateReservationMutate({
            reservationID: selectedReservation.id,
            reservationData: formData,
         })

         closeModal('edit-product')
      } else if (selectedCourt && selectedShift) {
         const { client } = formData
         const clientData =
            formData.clientType === 'new-client'
               ? { name: client.name, dni: client.dni, phone: client.phone }
               : { id: watch('client.id') }

         await createReservationMutate({
            courtID: selectedCourt.id,
            shift: selectedShift!,
            type: formData.type,
            clientType: formData.clientType,
            client: clientData,
            date: formatDateToString(selectedDate),
         })

         closeModal('create-product')
      }

      resetForm()
   }

   return (
      <Dialog
         open={modalFlags['create-reservation']}
         onOpenChange={() => closeModal('create-reservation')}
      >
         <DialogContent className="w-[500px] ">
            <DialogHeader>
               <DialogTitle>Nueva Reserva</DialogTitle>
               <DialogDescription className="capitalize">
                  {formatedDate}
               </DialogDescription>
            </DialogHeader>

            <ScrollArea className="pr-4 -mr-4 space-y-4 py-4">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                  <div className="space-y-2">
                     <InputForm
                        readOnly
                        label="Cancha"
                        name="courtName"
                        value={selectedCourt?.name}
                        className="bg-muted/50"
                     />
                  </div>

                  <div className="space-y-2">
                     <InputForm
                        readOnly
                        label="Horario"
                        name="shift"
                        value={String(selectedShift)}
                        className="bg-muted/50"
                     />
                  </div>
               </div>

               <div className="space-y-2 mt-6">
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
                           <RadioGroupItem
                              value={type}
                              id={type}
                              className="peer sr-only"
                           />
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
                  className="mt-6"
                  value={watch('clientType')}
                  onValueChange={(value) => {
                     resetForm()
                     setValue('clientType', value as ReservationFormData['clientType'], {
                        shouldValidate: true,
                     })
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
                     <div className="space-y-2">
                        <InputForm
                           label="Nombre Completo"
                           name="client.name"
                           type="text"
                           placeholder="Ej: Valentina Roldán"
                           disabled={isLoading}
                           register={register('client.name')}
                           errors={errors}
                        />
                     </div>

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
                     <div className="space-y-2">
                        <Label htmlFor="search-client">Buscar Cliente</Label>
                        <Input id="search-client" placeholder="Nombre, celular o email" />
                     </div>

                     <div className="border rounded-md p-4 max-h-[200px] overflow-y-auto">
                        <div className="space-y-2">
                           <input type="hidden" {...register('client.id')} />

                           {clients.map((client) => (
                              <div
                                 key={client.id}
                                 className="flex flex-col sm:flex-row sm:items-center justify-between p-2 hover:bg-muted/50 rounded-md cursor-pointer"
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
                                       watch('client.id') === client.id
                                          ? 'default'
                                          : 'outline'
                                    }
                                    onClick={() =>
                                       setValue(
                                          'client.id',
                                          watch('client.id') === client.id
                                             ? ''
                                             : client.id,
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
                     </div>
                  </TabsContent>
               </Tabs>

               {/* <div className="space-y-2 mt-6">
                  <Label htmlFor="notes">Notas adicionales (opcional)</Label>
                  <Input id="notes" placeholder="Ej: Solicita préstamo de paletas" />
               </div> */}
            </ScrollArea>

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
         </DialogContent>
      </Dialog>
   )
}

export default FormReservationModal
