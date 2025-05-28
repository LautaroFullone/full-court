import { getClientInitials } from '@lib'
import { Client } from '@models'
import { Avatar, AvatarFallback } from '@shadcn'
import { useAppStore } from '@stores'

interface ClientCardProps {
   client: Client
}

const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
   const selectedClient = useAppStore((state) => state.selectedClient)
   const appActions = useAppStore((state) => state.appActions)

   return (
      <div
         key={client.id}
         className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-muted/30 ${
            selectedClient?.id === client.id ? 'bg-muted' : ''
         }`}
         onClick={() => appActions.dispatchSelectedClient(client)}
      >
         <Avatar className="h-10 w-10 ">
            <AvatarFallback>{getClientInitials(client.name)}</AvatarFallback>
         </Avatar>

         <div className="flex-1 min-w-0">
            <div className="font-medium ">{client.name}</div>
            <div className="text-sm text-muted-foreground truncate">{client.phone}</div>
         </div>
      </div>
   )
}
export default ClientCard
