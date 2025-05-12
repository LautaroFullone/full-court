import { Edit, ShoppingCart, Trash2 } from 'lucide-react'
import { useAppStore } from '@stores'
import { useMobile } from '@hooks'
import { useState } from 'react'
import {
   Button,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@shadcn'

// Tipos de reserva
// const reservationTypes = {
//    clase: 'Clase',
//    partido: 'Partido',
//    torneo: 'Torneo',
//    entrenamiento: 'Entrenamiento',
// }

// Datos de ejemplo para los consumos
// const consumptions = [
//    { id: 1, product: 'Café', quantity: 2, price: 150, total: 300 },
//    { id: 2, product: 'Grip', quantity: 1, price: 800, total: 800 },
//    { id: 3, product: 'Gaseosa', quantity: 3, price: 200, total: 600 },
// ]

const ReservationDetailsModal: React.FC = () => {
   const [showCancelAlert, setShowCancelAlert] = useState(false)
   const [isEditing, setIsEditing] = useState(false)

   const isMobile = useMobile()

   const { selectedReservation } = useAppStore()

   // const handleSave = () => {
   //    onUpdate(editedReservation)
   //    setIsEditing(false)
   // }

   // return null

   return (
      <DialogContent className="sm:max-w-[700px] w-[95%] max-w-[95%] sm:w-auto">
         <DialogHeader>
            <DialogTitle>Detalle de Reserva #{selectedReservation?.id}</DialogTitle>
            <DialogDescription>Información completa de la reserva</DialogDescription>
         </DialogHeader>

         {/* <ScrollArea className="h-[400px] pr-4 -mr-4">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 py-4 pr-4">
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                     <CalendarDays className="h-5 w-5 text-muted-foreground" />
                     <div>
                        <p className="text-sm font-medium">Fecha</p>
                        <p className="text-sm text-muted-foreground">15 de Marzo, 2025</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <Clock className="h-5 w-5 text-muted-foreground" />
                     <div>
                        <p className="text-sm font-medium">Horario</p>
                        <p className="text-sm text-muted-foreground">
                           {selectedReservation?.shift}
                        </p>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <User className="h-5 w-5 text-muted-foreground" />
                     <div>
                        <p className="text-sm font-medium">Cliente</p>
                        <p className="text-sm text-muted-foreground">
                           {selectedReservation?.owner}
                        </p>
                        <p className="text-xs text-muted-foreground">Tel: 2236984284</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="h-5 w-5 flex items-center justify-center text-muted-foreground">
                        <span className="text-sm font-bold">T</span>
                     </div>
                     <div>
                        <p className="text-sm font-medium">Tipo de Reserva</p>
                        <p className="text-sm text-muted-foreground">
                           {
                              reservationTypes[
                                 selectedReservation?.type as keyof typeof reservationTypes
                              ]
                           }
                        </p>
                     </div>
                  </div>
               </div>

               <div>
                  <h3 className="text-sm font-medium mb-2">Consumos</h3>
                  <div className="overflow-x-auto">
                     <Table>
                        <TableHeader>
                           <TableRow>
                              <TableHead>Producto</TableHead>
                              <TableHead className="text-center">Cant.</TableHead>
                              <TableHead className="text-right">Total</TableHead>
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                           {consumptions.map((item) => (
                              <TableRow key={item.id}>
                                 <TableCell>{item.product}</TableCell>
                                 <TableCell className="text-center">
                                    {item.quantity}
                                 </TableCell>
                                 <TableCell className="text-right">
                                    ${item.total}
                                 </TableCell>
                              </TableRow>
                           ))}
                           <TableRow>
                              <TableCell colSpan={2} className="font-semibold">
                                 Total
                              </TableCell>
                              <TableCell className="text-right font-bold">
                                 $1,700
                              </TableCell>
                           </TableRow>
                        </TableBody>
                     </Table>
                  </div>
               </div>
            </div>
         </ScrollArea> */}

         {isEditing ? (
            <>
               <Button onClick={() => {}}>Guardar Cambios</Button>
               <Button variant="outline" onClick={() => {}}>
                  Cancelar
               </Button>
            </>
         ) : (
            <DialogFooter
               className={`flex ${
                  isMobile ? 'flex-col' : 'justify-between sm:justify-between'
               } gap-2`}
            >
               <div className="flex gap-2">
                  <Button
                     variant="outline"
                     size="sm"
                     className="gap-1"
                     onClick={() => setIsEditing(true)}
                  >
                     <Edit className="h-4 w-4" />
                     Editar
                  </Button>

                  <Button
                     variant="destructive"
                     size="sm"
                     className="gap-1"
                     onClick={() => setShowCancelAlert(true)}
                  >
                     <Trash2 className="h-4 w-4" />
                     Cancelar
                  </Button>
               </div>
               <div className="flex gap-2">
                  <Button size="sm" className="gap-1" onClick={() => {}}>
                     <ShoppingCart className="h-4 w-4" />
                     Gestionar Consumos
                  </Button>
               </div>
            </DialogFooter>
         )}

         {/* <AlertDialog
            open={showCancelAlert}
            onOpenChange={() => setShowCancelAlert(false)}
         >
            <AlertDialogContent className="w-[95%] max-w-[95%] sm:w-auto sm:max-w-md">
               <AlertDialogHeader>
                  <AlertDialogTitle>
                     ¿Estás seguro de que quieres cancelar esta reserva?
                  </AlertDialogTitle>

                  <AlertDialogDescription>
                     Esta acción no se puede deshacer. Esto eliminará permanentemente la
                     reserva y todos los datos asociados.
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
         </AlertDialog> */}
      </DialogContent>
   )
}

export default ReservationDetailsModal
