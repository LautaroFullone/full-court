import { useMobile, useStyles } from '@hooks'
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   Button,
   Dialog,
   DialogClose,
   DialogContent,
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
import { useAppStore, useModalStore } from '@stores'
import { CalendarDays, Clock, Edit, ShoppingCart, Trash2, User } from 'lucide-react'
import { useState } from 'react'

const DetailsReservationModal: React.FC = () => {
   const [showCancelAlert, setShowCancelAlert] = useState(false)
   // const [editedReservation, setEditedReservation] = useState(reservation)
   const isMobile = useMobile()
   const { selectedReservation } = useAppStore()
   const { getReservationTypeClass } = useStyles()
   const {
      modalFlags,
      modalActions: { closeModal },
   } = useModalStore()

   const handleSave = () => {
      // onUpdate(editedReservation)
   }

   if (selectedReservation) {
      return (
         <Dialog
            open={modalFlags['details-reservation']}
            onOpenChange={() => closeModal('details-reservation')}
         >
            <DialogContent className="sm:max-w-[700px] w-[95%] max-w-[95%] sm:w-auto">
               <DialogHeader>
                  <DialogTitle>Detalle de Reserva #{selectedReservation.id}</DialogTitle>
                  <DialogDescription>
                     Información completa de la reserva
                  </DialogDescription>
               </DialogHeader>

               <ScrollArea className="h-[400px] pr-4 -mr-4">
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 py-4 pr-4">
                     <div className="space-y-4">
                        <div className="flex items-center gap-3">
                           <CalendarDays className="h-5 w-5 text-muted-foreground" />
                           <div>
                              <p className="text-sm font-medium select-none">Fecha</p>
                              <p className="text-sm text-muted-foreground">
                                 15 de Marzo, 2025
                              </p>
                           </div>
                        </div>

                        <div className="flex items-center gap-3">
                           <Clock className="h-5 w-5 text-muted-foreground" />
                           <div>
                              <p className="text-sm font-medium">Horario</p>
                              <p className="text-sm text-muted-foreground">
                                 {selectedReservation.shift}
                              </p>
                           </div>
                        </div>

                        <div className="flex items-center gap-3">
                           <User className="h-5 w-5 text-muted-foreground" />
                           <div>
                              <p className="text-sm font-medium">Cliente</p>
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
                              <p className="text-sm font-medium">Tipo de Reserva</p>
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

                     {selectedReservation.items && (
                        <div>
                           <h3 className="text-sm font-medium mb-2">Consumos</h3>
                           <div className="overflow-x-auto">
                              <Table>
                                 <TableHeader>
                                    <TableRow>
                                       <TableHead>Producto</TableHead>
                                       <TableHead className="text-center">
                                          Cant.
                                       </TableHead>
                                       <TableHead className="text-right">Valor</TableHead>
                                    </TableRow>
                                 </TableHeader>

                                 <TableBody>
                                    {selectedReservation.items.map((item) => (
                                       <TableRow key={item.id}>
                                          <TableCell>{item.name}</TableCell>
                                          <TableCell className="text-center">
                                             {item.amount}
                                          </TableCell>
                                          <TableCell className="text-right">
                                             ${item.price.toLocaleString('es-CL')}
                                          </TableCell>
                                       </TableRow>
                                    ))}
                                    <TableRow>
                                       <TableCell colSpan={2} className="font-semibold">
                                          Total
                                       </TableCell>
                                       <TableCell className="text-right font-bold">
                                          $
                                          {selectedReservation.items
                                             .reduce((acc, item) => acc + item.price, 0)
                                             .toLocaleString('es-CL')}
                                       </TableCell>
                                    </TableRow>
                                 </TableBody>
                              </Table>
                           </div>
                        </div>
                     )}
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
                        className="gap-1 bg-amber-500 hover:bg-amber-500/90"
                        onClick={() => {}}
                     >
                        <Edit className="h-4 w-4" />
                        Editar
                     </Button>
                     <Button
                        variant="destructive"
                        size="lg"
                        className="gap-1"
                        onClick={() => {}}
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
                     <Button
                        size="lg"
                        className="gap-1"
                        variant="outline"
                        onClick={() => {}}
                     >
                        <ShoppingCart className="h-4 w-4" />
                        Gestionar Consumos
                     </Button>
                  </div>
               </DialogFooter>

               <AlertDialog open={showCancelAlert} onOpenChange={setShowCancelAlert}>
                  <AlertDialogContent className="w-[95%] max-w-[95%] sm:w-auto sm:max-w-md">
                     <AlertDialogHeader>
                        <AlertDialogTitle>
                           ¿Estás seguro de que quieres cancelar esta reserva?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                           Esta acción no se puede deshacer. Esto eliminará
                           permanentemente la reserva y todos los datos asociados.
                        </AlertDialogDescription>
                     </AlertDialogHeader>

                     <AlertDialogFooter
                        className={isMobile ? 'flex-col space-y-2' : 'sm:space-x-2'}
                     >
                        <AlertDialogCancel>No, mantener reserva</AlertDialogCancel>

                        <AlertDialogAction onClick={() => {}}>
                           Sí, cancelar reserva
                        </AlertDialogAction>
                     </AlertDialogFooter>
                  </AlertDialogContent>
               </AlertDialog>
            </DialogContent>
         </Dialog>
      )
   }

   return
}
export default DetailsReservationModal
