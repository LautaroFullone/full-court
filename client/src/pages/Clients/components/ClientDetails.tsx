import { Calendar, Edit, Mail, Phone, Trash2, UserRoundPen } from 'lucide-react'
import { Avatar, AvatarFallback, Badge, Button } from '@shadcn'
import { useModalStore } from '@stores'
import { Client } from '@models'

interface ClientDetailsProps {
   client?: Client | null
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ client }) => {
   const openModal = useModalStore((state) => state.modalActions.openModal)

   const getInitials = (name: string) => {
      return name
         .split(' ')
         .map((part) => part[0])
         .join('')
         .toUpperCase()
         .substring(0, 2)
   }

   if (!client) {
      return (
         <div className="h-full flex items-center justify-center p-8 text-center">
            <div className="max-w-md">
               <UserRoundPen className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />

               <h3 className="text-lg font-medium mb-2">Selecciona un cliente</h3>

               <p className="text-muted-foreground mb-4">
                  Selecciona un cliente del directorio para ver sus detalles completos
               </p>
            </div>
         </div>
      )
   }

   return (
      <div className="p-6 bg-card h-full ">
         <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-4 ">
               <Avatar className="h-16 w-16 ">
                  <AvatarFallback className="text-lg">
                     {getInitials(client.name)}
                  </AvatarFallback>
               </Avatar>

               <div>
                  <h2 className="text-2xl font-bold">{client.name}</h2>
                  <Badge variant="outline" className="mt-1">
                     DNI: {client.dni}
                  </Badge>
               </div>
            </div>

            <div className="flex gap-2">
               <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                     openModal('edit-client', {
                        selectedClient: client,
                     })
                  }
               >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
               </Button>

               <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive"
                  onClick={() => openModal('confirm-delete-client')}
               >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar
               </Button>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
               <h3 className="font-medium text-lg">Información de contacto</h3>
               <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border rounded-md">
                     <Phone className="h-5 w-5 text-muted-foreground" />

                     <div>
                        <div className="text-sm text-muted-foreground">Celular</div>
                        <div>{client.phone}</div>
                     </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-md">
                     <Mail className="h-5 w-5 text-muted-foreground" />

                     <div>
                        <div className="text-sm text-muted-foreground">Email</div>
                        <div>{client.email}</div>
                     </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-md">
                     <Calendar className="h-5 w-5 text-muted-foreground" />

                     <div>
                        <div className="text-sm text-muted-foreground">Última visita</div>
                        <div>{client.lastVisit}</div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="space-y-4">
               <h3 className="font-medium text-lg">Historial de reservas</h3>
               <div className="border rounded-md p-4 h-[200px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                     <Calendar className="h-10 w-10 mx-auto mb-2 opacity-20" />

                     <p>No hay reservas recientes</p>

                     <Button variant="link" size="sm">
                        Ver todas las reservas
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
export default ClientDetails
