import { useState } from 'react'
import { useMobile } from '@hooks'
import { es } from 'date-fns/locale'
import { useNavigate } from 'react-router-dom'
import {
   CalendarIcon,
   ChevronLeft,
   ChevronRight,
   Loader2,
   MoreHorizontal,
   Plus,
} from 'lucide-react'
import {
   AppLayout,
   Button,
   Calendar,
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
   Popover,
   PopoverContent,
   PopoverTrigger,
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from '@components'
import CalendarHandler from './CalendarHandler'
import ReservationDetailsModal from './ReservationDetailsModal'

// // Horarios disponibles (8:00 a 00:00 con turnos de 1.5 horas)
const timeSlots = [
   '8:00 - 9:30',
   '9:30 - 11:00',
   '11:00 - 12:30',
   '12:30 - 14:00',
   '14:00 - 15:30',
   '15:30 - 17:00',
   '17:00 - 18:30',
   '18:30 - 20:00',
   '20:00 - 21:30',
   '21:30 - 23:00',
   '23:00 - 00:30',
]

// Tipos de reserva
const reservationTypes = {
   clase: 'Clase',
   partido: 'Partido',
   torneo: 'Torneo',
   otro: 'Otro',
}

// Datos de ejemplo para las reservas
const mockReservations = [
   {
      id: 1,
      court: 1,
      timeSlot: '8:00 - 9:30',
      name: 'Carlos Rodríguez',
      phone: '555-1234',
      type: 'clase',
   },
   {
      id: 2,
      court: 2,
      timeSlot: '9:30 - 11:00',
      name: 'Ana Martínez',
      phone: '555-5678',
      type: 'partido',
   },
   {
      id: 3,
      court: 3,
      timeSlot: '11:00 - 12:30',
      name: 'Luis González',
      phone: '555-9012',
      type: 'torneo',
   },
   {
      id: 4,
      court: 4,
      timeSlot: '12:30 - 14:00',
      name: 'María López',
      phone: '555-3456',
      type: 'clase',
   },
   {
      id: 5,
      court: 1,
      timeSlot: '14:00 - 15:30',
      name: 'Juan Pérez',
      phone: '555-7890',
      type: 'partido',
   },
   {
      id: 6,
      court: 2,
      timeSlot: '15:30 - 17:00',
      name: 'Sofía Ramírez',
      phone: '555-2345',
      type: 'otro',
   },
   {
      id: 7,
      court: 3,
      timeSlot: '17:00 - 18:30',
      name: 'Diego Fernández',
      phone: '555-6789',
      type: 'clase',
   },
   {
      id: 8,
      court: 4,
      timeSlot: '18:30 - 20:00',
      name: 'Laura Torres',
      phone: '555-0123',
      type: 'partido',
   },
   {
      id: 9,
      court: 1,
      timeSlot: '20:00 - 21:30',
      name: 'Pablo Sánchez',
      phone: '555-4567',
      type: 'torneo',
   },
   {
      id: 10,
      court: 2,
      timeSlot: '21:30 - 23:00',
      name: 'Valentina Díaz',
      phone: '555-8901',
      type: 'partido',
   },
]

const Dashboard = () => {
   const [currentDate, setCurrentDate] = useState(new Date())
   const [selectedReservation, setSelectedReservation] = useState<any>(null)
   const [isCalendarOpen, setIsCalendarOpen] = useState(false)
   const [isNewReservationOpen, setIsNewReservationOpen] = useState(false)
   const [selectedTimeSlot, setSelectedTimeSlot] = useState('')
   const [selectedCourt, setSelectedCourt] = useState(0)
   const [isLoading, setIsLoading] = useState(false)
   const [reservations, setReservations] = useState(mockReservations)
   const [openReservationId, setOpenReservationId] = useState<number | null>(null)
   const [selectedCourtFilter, setSelectedCourtFilter] = useState<number | null>(null)
   const isMobile = useMobile()
   const navigate = useNavigate()

   // const handleDateChange = (newDate: Date) => {
   //    setIsLoading(true)
   //    setCurrentDate(newDate)

   //    // Simular la carga de nuevas reservas
   //    setTimeout(() => {
   //       // Aquí normalmente harías una llamada a la API para obtener las reservas de la nueva fecha
   //       // Por ahora, simplemente generamos nuevas reservas aleatorias
   //       const newReservations = generateRandomReservations(newDate)
   //       setReservations(newReservations)
   //       setIsLoading(false)
   //    }, 1000)
   // }

   // const handlePrevDay = () => {
   //    const newDate = new Date(currentDate)
   //    newDate.setDate(currentDate.getDate() - 1)
   //    handleDateChange(newDate)
   // }

   // const handleNextDay = () => {
   //    const newDate = new Date(currentDate)
   //    newDate.setDate(currentDate.getDate() + 1)
   //    handleDateChange(newDate)
   // }

   // const handleDateSelect = (date: Date | undefined) => {
   //    if (date) {
   //       handleDateChange(date)
   //       setIsCalendarOpen(false)
   //    }
   // }

   const handleNewReservation = (timeSlot: string, court: number) => {
      setSelectedTimeSlot(timeSlot)
      setSelectedCourt(court)
      setIsNewReservationOpen(true)
   }

   const getReservationTypeClass = (type: string) => {
      const classes = {
         clase: 'bg-blue-100 text-blue-800',
         partido: 'bg-green-100 text-green-800',
         torneo: 'bg-purple-100 text-purple-800',
         otro: 'bg-amber-100 text-amber-800',
      }
      return classes[type as keyof typeof classes] || 'bg-gray-100 text-gray-800'
   }

   const handleManageConsumptions = (reservationId: number) => {
      console.log(`Gestionar consumos para la reserva ${reservationId}`)
      navigate(`/reservas/${reservationId}/consumos`)
   }

   const handleEditReservation = (reservationId: number) => {
      // En lugar de navegar, abrimos el modal de detalles
      setOpenReservationId(reservationId)
   }

   const handleCancelReservation = (reservationId: number) => {
      console.log(`Cancelar reserva ${reservationId}`)
   }

   const handleReservationUpdate = (updatedReservation: any) => {
      // Actualizar la reserva en el estado local
      setReservations((prevReservations) =>
         prevReservations.map((res) =>
            res.id === updatedReservation.id ? updatedReservation : res
         )
      )
      // Mantener el modal abierto con los detalles actualizados
      setOpenReservationId(updatedReservation.id)
   }

   // Filtrar reservas por cancha para la vista móvil
   // const filteredReservations = selectedCourtFilter
   //    ? reservations.filter((r) => r.court === selectedCourtFilter)
   //    : reservations

   return (
      <AppLayout>
         <div className="space-y-4">
            <Tabs defaultValue="grid">
               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
                  {/* <div className="flex items-center space-x-2">
                     <Button variant="outline" size="icon" onClick={handlePrevDay}>
                        <ChevronLeft className="h-4 w-4" />
                     </Button>

                     <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                        <PopoverTrigger asChild>
                           <Button
                              variant="outline"
                              className="flex items-center gap-2 flex-1 sm:flex-initial"
                           >
                              <CalendarIcon className="h-4 w-4" />
                              <span className="font-medium capitalize text-sm sm:text-base truncate">
                                 {formattedDate}
                              </span>
                           </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0" align="start">
                           <Calendar
                              mode="single"
                              selected={currentDate}
                              onSelect={handleDateSelect}
                              locale={es}
                              initialFocus
                           />
                        </PopoverContent>
                     </Popover>

                     <Button variant="outline" size="icon" onClick={handleNextDay}>
                        <ChevronRight className="h-4 w-4" />
                     </Button>
                  </div> */}

                  <CalendarHandler />

                  <TabsList className="w-full sm:w-auto">
                     <TabsTrigger value="grid">Vista Grilla</TabsTrigger>
                     <TabsTrigger value="list">Vista Lista</TabsTrigger>
                  </TabsList>
               </div>

               {isMobile && (
                  <div className="mt-4 flex justify-center">
                     <Tabs defaultValue="1" className="w-full">
                        <TabsList className="grid grid-cols-4 w-full">
                           <TabsTrigger
                              value="1"
                              onClick={() => setSelectedCourtFilter(1)}
                           >
                              Cancha 1
                           </TabsTrigger>
                           <TabsTrigger
                              value="2"
                              onClick={() => setSelectedCourtFilter(2)}
                           >
                              Cancha 2
                           </TabsTrigger>
                           <TabsTrigger
                              value="3"
                              onClick={() => setSelectedCourtFilter(3)}
                           >
                              Cancha 3
                           </TabsTrigger>
                           <TabsTrigger
                              value="4"
                              onClick={() => setSelectedCourtFilter(4)}
                           >
                              Cancha 4
                           </TabsTrigger>
                        </TabsList>
                     </Tabs>
                  </div>
               )}

               <TabsContent value="grid" className="mt-4">
                  <div className="rounded-lg border">
                     {!isMobile && (
                        <div className="grid grid-cols-5 border-b">
                           <div className="p-3 font-medium">Horario</div>
                           <div className="p-3 font-medium text-center">Cancha 1</div>
                           <div className="p-3 font-medium text-center">Cancha 2</div>
                           <div className="p-3 font-medium text-center">Cancha 3</div>
                           <div className="p-3 font-medium text-center">Cancha 4</div>
                        </div>
                     )}

                     {isMobile && (
                        <div className="grid grid-cols-2 border-b">
                           <div className="p-3 font-medium">Horario</div>
                           <div className="p-3 font-medium text-center">
                              Cancha {selectedCourtFilter || 1}
                           </div>
                        </div>
                     )}

                     {isLoading ? (
                        <div className="flex items-center justify-center h-96">
                           <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                     ) : (
                        <div className="divide-y">
                           {timeSlots.map((timeSlot) => (
                              <div
                                 key={timeSlot}
                                 className={
                                    isMobile ? 'grid grid-cols-2' : 'grid grid-cols-5'
                                 }
                              >
                                 <div className="p-3 border-r">{timeSlot}</div>
                                 {isMobile
                                    ? // Vista móvil: solo mostrar la cancha seleccionada
                                      (() => {
                                         const court = selectedCourtFilter || 1
                                         const reservation = reservations.find(
                                            (r) =>
                                               r.court === court &&
                                               r.timeSlot === timeSlot
                                         )
                                         return (
                                            <div
                                               key={`${timeSlot}-${court}`}
                                               className={`p-2 relative h-20 ${
                                                  reservation
                                                     ? 'bg-primary/5 hover:bg-primary/10'
                                                     : 'hover:bg-muted/50'
                                               }`}
                                            >
                                               {reservation ? (
                                                  <Dialog
                                                     open={
                                                        openReservationId ===
                                                        reservation.id
                                                     }
                                                     onOpenChange={(open) =>
                                                        !open &&
                                                        setOpenReservationId(null)
                                                     }
                                                  >
                                                     <DialogTrigger asChild>
                                                        <div
                                                           className="flex flex-col items-center justify-center cursor-pointer h-full w-full rounded-md transition-colors"
                                                           onClick={() =>
                                                              setOpenReservationId(
                                                                 reservation.id
                                                              )
                                                           }
                                                        >
                                                           <span className="font-medium text-sm text-center">
                                                              {reservation.name}
                                                           </span>
                                                           <span
                                                              className={`text-xs px-2 py-0.5 rounded-full mt-1 ${getReservationTypeClass(
                                                                 reservation.type
                                                              )}`}
                                                           >
                                                              {
                                                                 reservationTypes[
                                                                    reservation.type as keyof typeof reservationTypes
                                                                 ]
                                                              }
                                                           </span>
                                                        </div>
                                                     </DialogTrigger>
                                                     <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                           <Button
                                                              variant="ghost"
                                                              size="icon"
                                                              className="absolute top-0 right-0 h-6 w-6"
                                                           >
                                                              <MoreHorizontal className="h-4 w-4" />
                                                           </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                           <DropdownMenuItem
                                                              onSelect={() =>
                                                                 handleManageConsumptions(
                                                                    reservation.id
                                                                 )
                                                              }
                                                           >
                                                              Gestionar consumos
                                                           </DropdownMenuItem>
                                                           <DropdownMenuItem
                                                              onSelect={() =>
                                                                 handleEditReservation(
                                                                    reservation.id
                                                                 )
                                                              }
                                                           >
                                                              Editar reserva
                                                           </DropdownMenuItem>
                                                           <DropdownMenuItem
                                                              onSelect={() =>
                                                                 handleCancelReservation(
                                                                    reservation.id
                                                                 )
                                                              }
                                                              className="text-destructive"
                                                           >
                                                              Cancelar reserva
                                                           </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                     </DropdownMenu>
                                                     <ReservationDetailsModal
                                                        reservation={reservation}
                                                        onEdit={() =>
                                                           handleEditReservation(
                                                              reservation.id
                                                           )
                                                        }
                                                        onCancel={() =>
                                                           handleCancelReservation(
                                                              reservation.id
                                                           )
                                                        }
                                                        onManageConsumptions={() =>
                                                           handleManageConsumptions(
                                                              reservation.id
                                                           )
                                                        }
                                                        onUpdate={handleReservationUpdate}
                                                     />
                                                  </Dialog>
                                               ) : (
                                                  <Dialog>
                                                     <DialogTrigger asChild>
                                                        <Button
                                                           variant="ghost"
                                                           size="sm"
                                                           className="w-full h-full flex items-center justify-center"
                                                           onClick={() =>
                                                              handleNewReservation(
                                                                 timeSlot,
                                                                 court
                                                              )
                                                           }
                                                        >
                                                           <Plus className="h-4 w-4 mr-1" />
                                                           Reservar
                                                        </Button>
                                                     </DialogTrigger>
                                                     <DialogContent className="sm:max-w-[600px] w-[95%] max-w-[95%] sm:w-auto">
                                                        <DialogHeader>
                                                           <DialogTitle>
                                                              Nueva Reserva
                                                           </DialogTitle>
                                                           <DialogDescription>
                                                              Cancha {court} - {timeSlot}
                                                           </DialogDescription>
                                                        </DialogHeader>
                                                        {/* <NewReservationForm
                                                        timeSlot={timeSlot}
                                                        court={court}
                                                        date={currentDate}
                                                     /> */}
                                                     </DialogContent>
                                                  </Dialog>
                                               )}
                                            </div>
                                         )
                                      })()
                                    : // Vista desktop: mostrar todas las canchas
                                      [1, 2, 3, 4].map((court) => {
                                         const reservation = reservations.find(
                                            (r) =>
                                               r.court === court &&
                                               r.timeSlot === timeSlot
                                         )
                                         return (
                                            <div
                                               key={`${timeSlot}-${court}`}
                                               className={`p-2 relative h-20 ${
                                                  reservation
                                                     ? 'bg-primary/5 hover:bg-primary/10'
                                                     : 'hover:bg-muted/50'
                                               }`}
                                            >
                                               {reservation ? (
                                                  <Dialog
                                                     open={
                                                        openReservationId ===
                                                        reservation.id
                                                     }
                                                     onOpenChange={(open) =>
                                                        !open &&
                                                        setOpenReservationId(null)
                                                     }
                                                  >
                                                     <DialogTrigger asChild>
                                                        <div
                                                           className="flex flex-col items-center justify-center cursor-pointer h-full w-full rounded-md transition-colors"
                                                           onClick={() =>
                                                              setOpenReservationId(
                                                                 reservation.id
                                                              )
                                                           }
                                                        >
                                                           <span className="font-medium text-sm text-center">
                                                              {reservation.name}
                                                           </span>
                                                           <span
                                                              className={`text-xs px-2 py-0.5 rounded-full mt-1 ${getReservationTypeClass(
                                                                 reservation.type
                                                              )}`}
                                                           >
                                                              {
                                                                 reservationTypes[
                                                                    reservation.type as keyof typeof reservationTypes
                                                                 ]
                                                              }
                                                           </span>
                                                        </div>
                                                     </DialogTrigger>
                                                     <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                           <Button
                                                              variant="ghost"
                                                              size="icon"
                                                              className="absolute top-0 right-0 h-6 w-6"
                                                           >
                                                              <MoreHorizontal className="h-4 w-4" />
                                                           </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                           <DropdownMenuItem
                                                              onSelect={() =>
                                                                 handleManageConsumptions(
                                                                    reservation.id
                                                                 )
                                                              }
                                                           >
                                                              Gestionar consumos
                                                           </DropdownMenuItem>
                                                           <DropdownMenuItem
                                                              onSelect={() =>
                                                                 handleEditReservation(
                                                                    reservation.id
                                                                 )
                                                              }
                                                           >
                                                              Editar reserva
                                                           </DropdownMenuItem>
                                                           <DropdownMenuItem
                                                              onSelect={() =>
                                                                 handleCancelReservation(
                                                                    reservation.id
                                                                 )
                                                              }
                                                              className="text-destructive"
                                                           >
                                                              Cancelar reserva
                                                           </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                     </DropdownMenu>
                                                     <ReservationDetailsModal
                                                        reservation={reservation}
                                                        onEdit={() =>
                                                           handleEditReservation(
                                                              reservation.id
                                                           )
                                                        }
                                                        onCancel={() =>
                                                           handleCancelReservation(
                                                              reservation.id
                                                           )
                                                        }
                                                        onManageConsumptions={() =>
                                                           handleManageConsumptions(
                                                              reservation.id
                                                           )
                                                        }
                                                        onUpdate={handleReservationUpdate}
                                                     />
                                                  </Dialog>
                                               ) : (
                                                  <Dialog>
                                                     <DialogTrigger asChild>
                                                        <Button
                                                           variant="ghost"
                                                           size="sm"
                                                           className="w-full h-full flex items-center justify-center"
                                                           onClick={() =>
                                                              handleNewReservation(
                                                                 timeSlot,
                                                                 court
                                                              )
                                                           }
                                                        >
                                                           <Plus className="h-4 w-4 mr-1" />
                                                           Reservar
                                                        </Button>
                                                     </DialogTrigger>
                                                     <DialogContent className="sm:max-w-[600px] w-[95%] max-w-[95%] sm:w-auto">
                                                        <DialogHeader>
                                                           <DialogTitle>
                                                              Nueva Reserva
                                                           </DialogTitle>
                                                           <DialogDescription>
                                                              Cancha {court} - {timeSlot}
                                                           </DialogDescription>
                                                        </DialogHeader>
                                                        {/* <NewReservationForm
                                                        timeSlot={timeSlot}
                                                        court={court}
                                                        date={currentDate}
                                                     /> */}
                                                     </DialogContent>
                                                  </Dialog>
                                               )}
                                            </div>
                                         )
                                      })}
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
               </TabsContent>

               <TabsContent value="list" className="mt-4">
                  <div className="rounded-lg border">
                     <div className="p-4">
                        <div className="grid grid-cols-3 md:grid-cols-5 font-medium border-b pb-2">
                           <div>Horario</div>
                           <div>Cancha</div>
                           <div className="hidden md:block">Cliente</div>
                           <div className="hidden md:block">Tipo</div>
                           <div>Acciones</div>
                        </div>
                        <div className="divide-y">
                           {reservations.map((reservation) => (
                              <div
                                 key={reservation.id}
                                 className="grid grid-cols-3 md:grid-cols-5 py-3 items-center"
                              >
                                 <div className="text-sm md:text-base">
                                    {reservation.timeSlot}
                                 </div>
                                 <div className="text-sm md:text-base">
                                    Cancha {reservation.court}
                                 </div>
                                 <div className="hidden md:block">
                                    <div>{reservation.name}</div>
                                 </div>
                                 <div className="hidden md:block">
                                    <span
                                       className={`text-xs px-2 py-0.5 rounded-full ${getReservationTypeClass(
                                          reservation.type
                                       )}`}
                                    >
                                       {
                                          reservationTypes[
                                             reservation.type as keyof typeof reservationTypes
                                          ]
                                       }
                                    </span>
                                 </div>
                                 <div className="flex space-x-2">
                                    <Dialog>
                                       <DialogTrigger asChild>
                                          <Button
                                             variant="outline"
                                             size="sm"
                                             onClick={() =>
                                                setSelectedReservation(reservation)
                                             }
                                          >
                                             Detalles
                                          </Button>
                                       </DialogTrigger>
                                       <ReservationDetailsModal
                                          reservation={reservation}
                                          onEdit={() =>
                                             handleEditReservation(reservation.id)
                                          }
                                          onCancel={() =>
                                             handleCancelReservation(reservation.id)
                                          }
                                          onManageConsumptions={() =>
                                             handleManageConsumptions(reservation.id)
                                          }
                                          onUpdate={handleReservationUpdate}
                                       />
                                    </Dialog>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </TabsContent>
            </Tabs>
         </div>
      </AppLayout>
   )
}

export default Dashboard

// Función para generar reservas aleatorias
function generateRandomReservations(date: Date) {
   const newReservations = []
   const reservationTypes = ['clase', 'partido', 'torneo', 'otro']
   const names = [
      'Juan Pérez',
      'María López',
      'Carlos Rodríguez',
      'Ana Martínez',
      'Luis González',
   ]

   for (let i = 0; i < 10; i++) {
      const court = Math.floor(Math.random() * 4) + 1
      const timeSlotIndex = Math.floor(Math.random() * timeSlots.length)
      const type = reservationTypes[Math.floor(Math.random() * reservationTypes.length)]
      const name = names[Math.floor(Math.random() * names.length)]

      newReservations.push({
         id: i + 1,
         court,
         timeSlot: timeSlots[timeSlotIndex],
         name,
         phone: `555-${Math.floor(1000 + Math.random() * 9000)}`,
         type,
      })
   }

   return newReservations
}
