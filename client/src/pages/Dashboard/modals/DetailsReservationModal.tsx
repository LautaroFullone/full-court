import { CalendarDays, Clock, Edit, ShoppingCart, Trash2, User } from 'lucide-react'
import { useAppStore, useModalStore } from '@stores'
import { useMobile, useStyles } from '@hooks'
import {
   Button,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   ScrollArea,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@shadcn'

const DetailsReservationModal = () => {
   const selectedReservation = useAppStore((state) => state.selectedReservation)
   const openModal = useModalStore((state) => state.modalActions.openModal)

   const isMobile = useMobile()
   const { getReservationTypeClass } = useStyles()

   if (!selectedReservation) return null

   return (
      <>
         <DialogHeader>
            <DialogTitle>Detalle de Reserva #{selectedReservation.id}</DialogTitle>
            <DialogDescription>Información completa de la reserva</DialogDescription>
         </DialogHeader>

         <ScrollArea className="h-[400px] pr-4 -mr-4">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-[40%_60%] py-4 pr-4 ">
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                     <CalendarDays className="h-5 w-5 text-muted-foreground" />
                     <div>
                        <p className="text-md font-medium">Fecha</p>
                        <p className="text-sm text-muted-foreground">15 de Marzo, 2025</p>
                     </div>
                  </div>

                  <div className="flex items-center gap-3">
                     <Clock className="h-5 w-5 text-muted-foreground" />
                     <div>
                        <p className="text-md font-medium">Horario</p>
                        <p className="text-sm text-muted-foreground">
                           {selectedReservation.shift}
                        </p>
                     </div>
                  </div>

                  <div className="flex items-center gap-3">
                     <User className="h-5 w-5 text-muted-foreground" />
                     <div>
                        <p className="text-md font-medium">Cliente</p>
                        <p className="text-sm text-muted-foreground">
                           {selectedReservation.owner.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                           Celular: {selectedReservation.owner.phone}
                        </p>
                     </div>
                  </div>

                  <div className="flex items-center gap-3">
                     <div className="h-5 w-5 flex items-center justify-center text-muted-foreground">
                        <span className="text-sm font-bold">T</span>
                     </div>
                     <div>
                        <p className="text-md font-medium">Tipo de Reserva</p>
                        <p className="text-sm text-muted-foreground capitalize">
                           <span
                              className={`text-xs px-2 py-0.5 rounded-full ${getReservationTypeClass(
                                 selectedReservation.type
                              )}`}
                           >
                              {selectedReservation.type}
                           </span>
                        </p>
                     </div>
                  </div>
               </div>

               <div className="w-full">
                  <h3 className="text-md font-medium mb-2">Consumos</h3>
                  <div className="overflow-x-auto">
                     <Table>
                        <TableHeader>
                           <TableRow>
                              <TableHead className="">Producto</TableHead>
                              <TableHead className="text-center">Cant.</TableHead>
                              <TableHead className="text-right">Valor</TableHead>
                           </TableRow>
                        </TableHeader>

                        {selectedReservation.items ? (
                           <TableBody>
                              {selectedReservation?.items?.map((item) => (
                                 <TableRow key={item.id} className="select-text">
                                    <TableCell>{item.name}</TableCell>

                                    <TableCell className="text-center">
                                       {item.amount}
                                    </TableCell>

                                    <TableCell className="text-right">
                                       ${Number(item.price).toLocaleString('es-AR')}
                                    </TableCell>
                                 </TableRow>
                              ))}

                              <TableRow className="select-text">
                                 <TableCell colSpan={2} className="font-semibold">
                                    Total
                                 </TableCell>

                                 <TableCell className="text-right font-bold">
                                    $
                                    {selectedReservation.items
                                       .reduce((acc, item) => acc + item.price, 0)
                                       .toLocaleString()}
                                 </TableCell>
                              </TableRow>
                           </TableBody>
                        ) : (
                           <TableBody>
                              <TableRow>
                                 <TableCell colSpan={3} className="h-32 text-center">
                                    <div className="flex flex-col items-center justify-center">
                                       <ShoppingCart className="h-8 w-8 text-muted-foreground mb-2" />
                                       <p className="text-sm text-muted-foreground mb-3 text-wrap">
                                          No hay consumos registrados <br /> para esta
                                          reserva
                                       </p>
                                       <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => {}}
                                       >
                                          Agregar consumos
                                       </Button>
                                    </div>
                                 </TableCell>
                              </TableRow>
                           </TableBody>
                        )}
                     </Table>
                  </div>
               </div>
            </div>
         </ScrollArea>

         <DialogFooter
            className={`flex ${
               isMobile ? 'flex-col' : 'justify-between sm:justify-between'
            } gap-2`}
         >
            <div className="flex gap-2">
               <Button
                  variant="destructive"
                  size="lg"
                  className="gap-1 bg-amber-500 hover:bg-amber-500/90 dark:bg-amber-500/60"
                  onClick={() =>
                     openModal('edit-reservation', {
                        reservation: selectedReservation,
                     })
                  }
               >
                  <Edit className="h-4 w-4" />
                  Editar
               </Button>

               <Button
                  variant="destructive"
                  size="lg"
                  className="gap-1"
                  onClick={() =>
                     openModal('confirm-reservation', {
                        reservation: selectedReservation,
                     })
                  }
               >
                  <Trash2 className="h-4 w-4" />
                  Cancelar
               </Button>
            </div>

            <div className="flex gap-2">
               {/* <DialogClose asChild>
                        <Button variant="outline" size="lg">
                           Cerrar
                        </Button>
                     </DialogClose> */}
               <Button size="lg" className="gap-1" variant="default" onClick={() => {}}>
                  <ShoppingCart className="h-4 w-4" />
                  Gestionar Consumos
               </Button>
            </div>
         </DialogFooter>
      </>
   )
}

export default DetailsReservationModal
