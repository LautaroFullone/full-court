import { useAppStore, useModalStore } from '@stores'
import { useBasicForm, useMobile } from '@hooks'
import { formatDateToString } from '@lib'
import { useMemo, useState } from 'react'
import {
   Button,
   Dialog,
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
   Client,
   CLIENTS,
   ClientType,
   RESERVATION_TYPES_VALUES,
   ReservationType,
} from '@models'

interface NewReservationForm {
   clientType: ClientType
   name: string
   phone: string
   email: string
   reservationType: ReservationType
}

const initialFormData: NewReservationForm = {
   clientType: 'new-client',
   name: '',
   phone: '',
   email: '',
   reservationType: 'clase',
}

const NewReservationModal: React.FC = () => {
   const isMobile = useMobile()
   const { selectedDate } = useAppStore()
   const { selectedCourt, selectedShift } = useAppStore()
   const {
      modalFlags,
      modalActions: { closeModal },
   } = useModalStore()
   const { formData, handleChange, resetForm } = useBasicForm(initialFormData)

   const [selectedClient, setSelectedClient] = useState<Client | undefined>()

   const formatedDate = useMemo(
      () => formatDateToString(selectedDate, true),
      [selectedDate]
   )

   async function handleSubmit(evt: React.FormEvent) {
      evt.preventDefault()
      //await createReservation(formData)
      resetForm()
      closeModal('new-reservation')
   }

   function handleSelectClient(client: Client) {
      if (selectedClient?.id === client.id) {
         setSelectedClient(undefined)
      } else {
         setSelectedClient(client)
      }
   }

   return (
      <Dialog
         open={modalFlags['new-reservation']}
         onOpenChange={() => closeModal('new-reservation')}
      >
         <DialogContent className="w-[500px] h-[70vh]">
            <DialogHeader>
               <DialogTitle>Nueva Reserva</DialogTitle>
               <DialogDescription className="capitalize">
                  {formatedDate}
               </DialogDescription>
            </DialogHeader>

            {/* <NewReservationForm timeSlot={timeSlot} court={court} date={selectedDate} /> */}

            <div className="space-y-4 py-4  overflow-y-auto">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                  <div className="space-y-2 ">
                     <Label>Cancha</Label>
                     <div className="p-2 border rounded-md bg-muted/50">
                        {selectedCourt?.name}
                     </div>
                  </div>

                  <div className="space-y-2">
                     <Label>Horario</Label>
                     <div className="p-2 border rounded-md bg-muted/50">
                        {selectedShift}
                     </div>
                  </div>
               </div>

               <Tabs
                  defaultValue="existing-client"
                  className="mt-6"
                  onValueChange={(value) => handleChange('clientType', value)}
               >
                  <TabsList className="grid w-full grid-cols-2">
                     <TabsTrigger value="new-client" className="cursor-pointer">
                        Cliente Nuevo
                     </TabsTrigger>

                     <TabsTrigger value="existing-client" className="cursor-pointer">
                        Cliente Existente
                     </TabsTrigger>
                  </TabsList>

                  <TabsContent value="existing-client" className="space-y-4 mt-4">
                     <div className="space-y-2">
                        <Label htmlFor="search-client">Buscar Cliente</Label>
                        <Input
                           id="search-client"
                           placeholder="Nombre, teléfono o email"
                        />
                     </div>

                     <div className="border rounded-md p-4 max-h-[200px] overflow-y-auto">
                        <div className="space-y-2">
                           {CLIENTS.map((client) => (
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
                                    size="sm"
                                    className="w-full sm:w-auto"
                                    variant={
                                       selectedClient?.id === client.id
                                          ? 'default'
                                          : 'outline'
                                    }
                                    onClick={() => handleSelectClient(client)}
                                 >
                                    {selectedClient?.id === client.id
                                       ? 'Seleccionado'
                                       : 'Seleccionar'}
                                 </Button>
                              </div>
                           ))}
                        </div>
                     </div>
                  </TabsContent>

                  <TabsContent value="new-client" className="space-y-4 mt-4">
                     <div className="space-y-2">
                        <Label htmlFor="name">Nombre y Apellido</Label>
                        <Input
                           id="name"
                           placeholder="Ej: Juan Pérez"
                           value={formData.name}
                           onChange={(evt) => handleChange('name', evt.target.value)}
                        />
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                           id="phone"
                           placeholder="Ej: 555-1234"
                           value={formData.phone}
                           onChange={(evt) => handleChange('phone', evt.target.value)}
                        />
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="email">Email (opcional)</Label>
                        <Input
                           id="email"
                           type="email"
                           placeholder="Ej: juan@ejemplo.com"
                           value={formData.email}
                           onChange={(evt) => handleChange('email', evt.target.value)}
                        />
                     </div>
                  </TabsContent>
               </Tabs>

               <div className="space-y-2 mt-6">
                  <Label>Tipo de Reserva</Label>
                  <RadioGroup
                     defaultValue="partido"
                     value={formData.reservationType}
                     onValueChange={(value) => handleChange('reservationType', value)}
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

               <div className="space-y-2">
                  <Label htmlFor="notes">Notas adicionales (opcional)</Label>
                  <Input id="notes" placeholder="Ej: Solicita préstamo de paletas" />
               </div>
            </div>

            <DialogFooter className={`${isMobile ? 'flex-col space-y-2' : ''}`}>
               {/* <Button
                  variant="outline"
                  size="lg"
                  className={isMobile ? 'w-full' : ''}
                  onClick={() => closeModal('new-reservation')}
               >
                  Cerrar
               </Button> */}

               <Button
                  type="submit"
                  size="lg"
                  onClick={handleSubmit}
                  className={isMobile ? 'w-full' : ''}
               >
                  Crear Reserva
               </Button>

               {/* Version 2 del boton Crear Reserva */}
               {/* <Button
                  type="submit"
                  variant="destructive"
                  size="lg"
                  onClick={handleSubmit}
                  className={`bg-green-500 hover:bg-green-500/90 ${
                     isMobile ? 'w-full' : ''
                  }`}
               >
                  Crear Reserva
               </Button> */}
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}

export default NewReservationModal
