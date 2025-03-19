import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components'

const NewReservationModal = () => {
   return (
      <DialogContent className="sm:max-w-[600px] w-[95%] max-w-[95%] sm:w-auto">
         <DialogHeader>
            <DialogTitle>Nueva Reserva</DialogTitle>
            <DialogDescription>
               Cancha {court} - {timeSlot}
            </DialogDescription>
         </DialogHeader>
         {/* <NewReservationForm timeSlot={timeSlot} court={court} date={selectedDate} /> */}

         <div className="space-y-4 py-4 max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="space-y-2">
                  <Label>Fecha</Label>
                  <div className="p-2 border rounded-md bg-muted/50">{formattedDate}</div>
               </div>
               <div className="space-y-2">
                  <Label>Horario</Label>
                  <div className="p-2 border rounded-md bg-muted/50">{timeSlot}</div>
               </div>
            </div>

            <div className="space-y-2">
               <Label>Cancha</Label>
               <div className="p-2 border rounded-md bg-muted/50">Cancha {court}</div>
            </div>

            <Tabs defaultValue="cliente-existente" className="mt-6">
               <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="cliente-existente">Cliente Existente</TabsTrigger>
                  <TabsTrigger value="cliente-nuevo">Cliente Nuevo</TabsTrigger>
               </TabsList>
               <TabsContent value="cliente-existente" className="space-y-4 mt-4">
                  <div className="space-y-2">
                     <Label htmlFor="search-client">Buscar Cliente</Label>
                     <Input id="search-client" placeholder="Nombre, teléfono o email" />
                  </div>
                  <div className="border rounded-md p-4 max-h-[200px] overflow-y-auto">
                     <div className="space-y-2">
                        {existingClients.map((client) => (
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
                                    selectedClient === client.id ? 'default' : 'outline'
                                 }
                                 onClick={() => setSelectedClient(client.id)}
                                 className="w-full sm:w-auto"
                              >
                                 {selectedClient === client.id
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
                        value={newClientName}
                        onChange={(e) => setNewClientName(e.target.value)}
                     />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="phone">Teléfono</Label>
                     <Input
                        id="phone"
                        placeholder="Ej: 555-1234"
                        value={newClientPhone}
                        onChange={(e) => setNewClientPhone(e.target.value)}
                     />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="email">Email (opcional)</Label>
                     <Input
                        id="email"
                        type="email"
                        placeholder="Ej: juan@ejemplo.com"
                        value={newClientEmail}
                        onChange={(e) => setNewClientEmail(e.target.value)}
                     />
                  </div>
               </TabsContent>
            </Tabs>

            <div className="space-y-2 mt-6">
               <Label>Tipo de Reserva</Label>
               <RadioGroup
                  defaultValue="partido"
                  value={reservationType}
                  onValueChange={setReservationType}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4"
               >
                  <div>
                     <RadioGroupItem
                        value="partido"
                        id="partido"
                        className="peer sr-only"
                     />
                     <Label
                        htmlFor="partido"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                     >
                        Partido
                     </Label>
                  </div>
                  <div>
                     <RadioGroupItem value="clase" id="clase" className="peer sr-only" />
                     <Label
                        htmlFor="clase"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                     >
                        Clase
                     </Label>
                  </div>
                  <div>
                     <RadioGroupItem
                        value="torneo"
                        id="torneo"
                        className="peer sr-only"
                     />
                     <Label
                        htmlFor="torneo"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                     >
                        Torneo
                     </Label>
                  </div>
                  <div>
                     <RadioGroupItem value="otro" id="otro" className="peer sr-only" />
                     <Label
                        htmlFor="otro"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                     >
                        Otro
                     </Label>
                  </div>
               </RadioGroup>
            </div>

            <div className="space-y-2">
               <Label htmlFor="notes">Notas adicionales (opcional)</Label>
               <Input id="notes" placeholder="Ej: Solicita préstamo de raquetas" />
            </div>

            <DialogFooter className={`mt-6 ${isMobile ? 'flex-col space-y-2' : ''}`}>
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
         </div>
      </DialogContent>
   )
}

export default NewReservationModal
