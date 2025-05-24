import { ConfirmDeleteClientModal, UpsertClientModal } from './modals'
import { ClientCard, ClientDetails } from './components'
import { useAppStore, useModalStore } from '@stores'
import { Filter, Plus, Search } from 'lucide-react'
import { AppLayout } from '@shared'
import { useState } from 'react'
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

const allClients2 = [
   {
      id: '1',
      name: 'Juan Pérez',
      dni: '12345678A',
      phone: '555-1234',
      email: 'juan@example.com',
      lastVisit: '2023-05-15',
   },
   {
      id: '2',
      name: 'María López',
      dni: '87654321B',
      phone: '555-5678',
      email: 'maria@example.com',
      lastVisit: '2023-05-20',
   },
   {
      id: '3',
      name: 'Carlos Rodríguez',
      dni: '11223344C',
      phone: '555-9012',
      email: 'carlos@example.com',
      lastVisit: '2023-05-18',
   },
   {
      id: '4',
      name: 'Ana Martínez',
      dni: '44332211D',
      phone: '555-3456',
      email: 'ana@example.com',
      lastVisit: '2023-05-22',
   },
   {
      id: '5',
      name: 'Luis González',
      dni: '55667788E',
      phone: '555-7890',
      email: 'luis@example.com',
      lastVisit: '2023-05-17',
   },
   {
      id: '6',
      name: 'Sofía Ramírez',
      dni: '88776655F',
      phone: '555-2345',
      email: 'sofia@example.com',
      lastVisit: '2023-05-19',
   },
   {
      id: '7',
      name: 'Diego Fernández',
      dni: '99887766G',
      phone: '555-6789',
      email: 'diego@example.com',
      lastVisit: '2023-05-21',
   },
   {
      id: '8',
      name: 'Laura Torres',
      dni: '66778899H',
      phone: '555-0123',
      email: 'laura@example.com',
      lastVisit: '2023-05-16',
   },
   {
      id: '9',
      name: 'Pablo Sánchez',
      dni: '12312312I',
      phone: '555-4567',
      email: 'pablo@example.com',
      lastVisit: '2023-05-23',
   },
   {
      id: '10',
      name: 'Valentina Díaz',
      dni: '45645645J',
      phone: '555-8901',
      email: 'valentina@example.com',
      lastVisit: '2023-05-24',
   },
]

const Clients = () => {
   // Función para obtener las iniciales del nombre
   const [allClients] = useState(allClients2)
   const [searchTerm, setSearchTerm] = useState('')

   const [sortBy, setSortBy] = useState<string>('name')
   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

   const selectedClient = useAppStore((state) => state.selectedClient)
   const modalActions = useModalStore((state) => state.modalActions)

   // Filtrar clientes por término de búsqueda
   const filteredClients = allClients.filter(
      (client) =>
         client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         client.dni.toLowerCase().includes(searchTerm.toLowerCase()) ||
         client.phone.includes(searchTerm) ||
         client.email.toLowerCase().includes(searchTerm.toLowerCase())
   )

   // Ordenar clientes
   const sortedClients = [...filteredClients].sort((a, b) => {
      if (sortBy === 'name') {
         return sortOrder === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
      } else if (sortBy === 'lastVisit') {
         return sortOrder === 'asc'
            ? new Date(a.lastVisit).getTime() - new Date(b.lastVisit).getTime()
            : new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime()
      }
      return 0
   })

   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value)
   }

   // const toggleSort = (field: string) => {
   //    if (sortBy === field) {
   //       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
   //    } else {
   //       setSortBy(field)
   //       setSortOrder('asc')
   //    }
   // }

   return (
      <AppLayout>
         <div className="px-4 py-6">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
               <div>
                  <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
                  <p className="text-muted-foreground">
                     Gestiona la información de los clientes
                  </p>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
               <div className="relative w-full sm:w-auto sm:flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                     type="search"
                     placeholder="Buscar clientes..."
                     className="pl-8"
                     value={searchTerm}
                     onChange={handleSearch}
                  />
               </div>

               <div className="flex gap-2 w-full sm:w-auto">
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
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

                  <Button onClick={() => modalActions.openModal('new-client')}>
                     <Plus className="mr-2 h-4 w-4" />
                     Nuevo Cliente
                  </Button>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="md:col-span-1 border rounded-lg overflow-hidden">
                  <div className="p-3 bg-muted/50 font-medium border-b flex justify-between items-center">
                     <span>Directorio de Clientes</span>
                     <Badge>{sortedClients.length} clientes</Badge>
                  </div>

                  <ScrollArea className="h-[60vh]">
                     <div className="divide-y">
                        {sortedClients.map((client) => (
                           <ClientCard key={`client-card-${client.id}`} client={client} />
                        ))}
                     </div>
                  </ScrollArea>
               </div>

               <div className="md:col-span-2 border rounded-lg overflow-hidden shadow-md">
                  <ClientDetails client={selectedClient} />
               </div>
            </div>

            <UpsertClientModal />
            <ConfirmDeleteClientModal />
         </div>
      </AppLayout>
   )
}
export default Clients
