import { Filter, Loader2, Plus, Search, UserRoundSearch } from 'lucide-react'
import { ConfirmDeleteClientModal, FormClientModal } from './modals'
import { ClientCard, ClientDetails } from './components'
import { useAppStore, useModalStore } from '@stores'
import { useEffect, useState } from 'react'
import { useFetchClients } from '@hooks'
import { AppLayout } from '@shared'
import {
   Badge,
   Button,
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuTrigger,
   Input,
   ScrollArea,
} from '@shadcn'

const Clients = () => {
   const selectedClient = useAppStore((state) => state.selectedClient)
   const dispatchSelectedClient = useAppStore(
      (state) => state.appActions.dispatchSelectedClient
   )
   const openModal = useModalStore((state) => state.modalActions.openModal)

   const { clients, isPending } = useFetchClients()

   const [searchTerm, setSearchTerm] = useState('')
   const [sortBy, setSortBy] = useState<string>('name')
   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

   const filteredClients = clients.filter(
      (client) =>
         client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         client.dni.toLowerCase().includes(searchTerm.toLowerCase()) ||
         client.phone.includes(searchTerm) ||
         client.email?.toLowerCase().includes(searchTerm.toLowerCase())
   )

   const sortedClients = filteredClients?.sort((a, b) => {
      if (sortBy === 'name') {
         return sortOrder === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
      } else if (sortBy === 'lastVisit') {
         return sortOrder === 'asc'
            ? new Date(a.lastVisit || '').getTime() -
                 new Date(b.lastVisit || '').getTime()
            : new Date(b.lastVisit || '').getTime() -
                 new Date(a.lastVisit || '').getTime()
      }
      return 0
   })

   useEffect(() => {
      return dispatchSelectedClient(null)
      // eslint-disable-next-line
   }, [])

   return (
      <AppLayout>
         <div className="px-4 py-6">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
               <div>
                  <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
                  <p className="text-muted-foreground">
                     Gestioná la información de los clientes
                  </p>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
               <div className="relative w-full sm:w-auto sm:flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                     type="search"
                     placeholder="Buscar clientes..."
                     className="pl-8 "
                     value={searchTerm}
                     disabled={sortedClients?.length === 0}
                     onChange={(evt) => setSearchTerm(evt.target.value)}
                  />
               </div>

               <div className="flex gap-2 w-full sm:w-auto">
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild disabled={sortedClients?.length === 0}>
                        <Button variant="outline">
                           <Filter className="mr-2 h-4 w-4" />
                           Ordenar
                        </Button>
                     </DropdownMenuTrigger>

                     <DropdownMenuContent align="end">
                        <DropdownMenuCheckboxItem
                           checked={sortBy === 'name' && sortOrder === 'asc'}
                           onCheckedChange={() => {
                              setSortBy('name')
                              setSortOrder('asc')
                           }}
                        >
                           Nombre (A-Z)
                        </DropdownMenuCheckboxItem>

                        <DropdownMenuCheckboxItem
                           checked={sortBy === 'name' && sortOrder === 'desc'}
                           onCheckedChange={() => {
                              setSortBy('name')
                              setSortOrder('desc')
                           }}
                        >
                           Nombre (Z-A)
                        </DropdownMenuCheckboxItem>

                        <DropdownMenuCheckboxItem
                           checked={sortBy === 'lastVisit' && sortOrder === 'desc'}
                           onCheckedChange={() => {
                              setSortBy('lastVisit')
                              setSortOrder('desc')
                           }}
                        >
                           Visita más reciente
                        </DropdownMenuCheckboxItem>

                        <DropdownMenuCheckboxItem
                           checked={sortBy === 'lastVisit' && sortOrder === 'asc'}
                           onCheckedChange={() => {
                              setSortBy('lastVisit')
                              setSortOrder('asc')
                           }}
                        >
                           Visita más antigua
                        </DropdownMenuCheckboxItem>
                     </DropdownMenuContent>
                  </DropdownMenu>

                  <Button onClick={() => openModal('create-client')}>
                     <Plus className="mr-2 h-4 w-4" />
                     Nuevo Cliente
                  </Button>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="md:col-span-1 border rounded-lg overflow-hidden">
                  <div className="p-3 bg-muted/50 font-medium border-b flex justify-between items-center">
                     <span>Directorio de Clientes</span>
                     <Badge>{sortedClients?.length} clientes</Badge>
                  </div>

                  {isPending ? (
                     <div className="h-[60vh]  flex items-center justify-center p-8">
                        <div className="flex flex-col items-center justify-center h-screen">
                           <Loader2 className="h-8 w-8 animate-spin" />

                           <p className="text-sm text-muted-foreground mt-2">
                              Cargando clientes...
                           </p>
                        </div>
                     </div>
                  ) : sortedClients?.length ? (
                     <ScrollArea className="h-[60vh]">
                        <div className="divide-y">
                           {sortedClients.map((client) => (
                              <ClientCard
                                 key={`client-card-${client.id}`}
                                 client={client}
                              />
                           ))}
                        </div>
                     </ScrollArea>
                  ) : (
                     <div className="h-[60vh] flex items-center justify-center p-8 text-center">
                        <div className="max-w-sm">
                           <UserRoundSearch className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />
                           <h3 className="text-lg font-medium mb-2">
                              No hay clientes registrados
                           </h3>
                           <p className="text-muted-foreground mb-4">
                              {searchTerm
                                 ? `No hay clientes que coincidan con "${searchTerm}". Intenta con otros términos de búsqueda.`
                                 : 'Comienza agregando tu primer cliente para gestionar sus reservas y datos de contacto.'}
                           </p>
                           <Button onClick={() => openModal('create-client')}>
                              <Plus className="mr-2 h-4 w-4" />
                              Nuevo Cliente
                           </Button>
                        </div>
                     </div>
                  )}
               </div>

               <div className="md:col-span-2 border rounded-lg overflow-hidden shadow-md">
                  <ClientDetails client={selectedClient} />
               </div>
            </div>

            <FormClientModal />
            <ConfirmDeleteClientModal />
         </div>
      </AppLayout>
   )
}
export default Clients
