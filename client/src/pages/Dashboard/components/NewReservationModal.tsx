import { formatDateToString } from '@lib'
import { useMemo, useState } from 'react'
import { Client, CLIENTS, RESERVATION_TYPES_VALUES } from '@models'
import { useAppStore, useModalStore } from '@stores'
import { useBasicForm, useCalendar, useMobile } from '@hooks'
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
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from '@shadcn'

const NewReservationModal: React.FC = () => {
   const isMobile = useMobile()
   const { selectedDate } = useCalendar()
   const { selectedCourt, selectedShift } = useAppStore()
   const { modalFlags, modalActions } = useModalStore()
   const { formData, handleChange, resetForm } = useBasicForm({
      name: '',
      phone: '',
      email: '',
      reservationType: 'partido',
   })

   const [selectedClient, setSelectedClient] = useState<Client | undefined>()

   console.log('## NewReservationModal')
   // console.log('selectedCourt', selectedCourt)
   // console.log('selectedShift', selectedShift)

   const formatedDate = useMemo(
      () => formatDateToString(selectedDate, true),
      [selectedDate]
   )

   async function handleSubmit(evt: React.FormEvent) {
      evt.preventDefault()
      //await loginUser(formData)
      resetForm()
      modalActions.closeModal('new-reservation')
   }

   return (
      <Dialog
         open={modalFlags['new-reservation']}
         onOpenChange={() => modalActions.closeModal('new-reservation')}
      >
         <DialogContent className="sm:max-w-[600px] w-[95%] max-w-[95%] sm:w-auto ">
            <DialogHeader>
               <DialogTitle>Nueva Reserva</DialogTitle>
               <DialogDescription className="capitalize">
                  {formatedDate}
               </DialogDescription>
            </DialogHeader>

            {/* <NewReservationForm timeSlot={timeSlot} court={court} date={selectedDate} /> */}

            <div className="space-y-4 py-4 md:max-h-[70vh] overflow-y-auto md:w-[35vw] ">
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

               {/* <div className="space-y-2">
                  <Label>Cancha</Label>
                  <div className="p-2 border rounded-md bg-muted/50">
                     Cancha {selectedCourt?.name}
                  </div>
               </div> */}

               <Tabs defaultValue="cliente-existente" className="mt-6">
                  <TabsList className="grid w-full grid-cols-2">
                     <TabsTrigger value="cliente-nuevo" className="cursor-pointer">
                        Cliente Nuevo
                     </TabsTrigger>
                     <TabsTrigger value="cliente-existente" className="cursor-pointer">
                        Cliente Existente
                     </TabsTrigger>
                  </TabsList>

                  <TabsContent value="cliente-existente" className="space-y-4 mt-4">
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
                                    variant={
                                       selectedClient?.id === client.id
                                          ? 'default'
                                          : 'outline'
                                    }
                                    onClick={() => setSelectedClient(client)}
                                    className="w-full sm:w-auto"
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

                  <TabsContent value="cliente-nuevo" className="space-y-4 mt-4">
                     <div className="space-y-2">
                        <Label htmlFor="name">Nombre y Apellido</Label>
                        <Input
                           id="name"
                           placeholder="Ej: Juan Pérez"
                           value={formData.name}
                           onChange={handleChange}
                        />
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                           id="phone"
                           placeholder="Ej: 555-1234"
                           value={formData.phone}
                           onChange={handleChange}
                        />
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email (opcional)</Label>
                        <Input
                           id="email"
                           type="email"
                           placeholder="Ej: juan@ejemplo.com"
                           value={formData.email}
                           onChange={handleChange}
                        />
                     </div>
                  </TabsContent>
               </Tabs>

               <div className="space-y-2 mt-6">
                  <Label>Tipo de Reserva</Label>
                  <RadioGroup
                     defaultValue="partido"
                     value={formData.reservationType}
                     onChange={handleChange}
                     // onValueChange={(evt) => handleChange(evt.target.)}
                     className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                  >
                     {RESERVATION_TYPES_VALUES.map((type) => (
                        <div>
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
                                 [&:has([data-state=checked])]:border-primary
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
                  <Input id="notes" placeholder="Ej: Solicita préstamo de raquetas" />
               </div>
            </div>

            <DialogFooter className={`${isMobile ? 'flex-col space-y-2' : ''}`}>
               <DialogClose asChild>
                  <Button variant="outline" className={isMobile ? 'w-full' : ''}>
                     Cancelar
                  </Button>
               </DialogClose>

               <Button
                  type="submit"
                  onClick={handleSubmit}
                  className={isMobile ? 'w-full' : ''}
               >
                  Crear Reserva
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}

export default NewReservationModal
