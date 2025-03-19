import {
   CheckCircle,
   AlertCircle,
   PencilLine,
   Clock,
   Activity,
   CircleCheck,
   Trash,
   Trash2,
   Trash2Icon,
   TicketCheck,
   ShieldCheck,
   CalendarCheck,
   CalendarCog,
   CalendarX,
   UserRoundPlus,
   UserRoundPen,
   UserRoundX,
   PackageCheck,
   PackageMinus,
   PackageSearch,
} from 'lucide-react'
import { Button, Popover, PopoverContent, PopoverTrigger } from '@components'

type Activity = {
   id: number
   user: string
   action: string //'create' | 'update' | 'delete'
   entity: string
   entityId: number
   entityName: string
   timestamp: string
}

const activities: Activity[] = [
   {
      id: 1,
      user: 'admin',
      action: 'create',
      entity: 'reserva',
      entityId: 15,
      entityName: 'Cancha 1 - 14:00',
      timestamp: '2023-05-24 14:30',
   },
   {
      id: 2,
      user: 'admin',
      action: 'update',
      entity: 'cliente',
      entityId: 5,
      entityName: 'Luis González',
      timestamp: '2023-05-23 10:15',
   },
   {
      id: 3,
      user: 'lautaro',
      action: 'delete',
      entity: 'reserva',
      entityId: 12,
      entityName: 'Cancha 3 - 11:00',
      timestamp: '2023-05-22 16:45',
   },
   {
      id: 4,
      user: 'admin',
      action: 'create',
      entity: 'reserva',
      entityId: 25,
      entityName: 'Cancha 2 - 15:30',
      timestamp: '2023-05-21 09:20',
   },
   {
      id: 5,
      user: 'lautaro',
      action: 'update',
      entity: 'producto',
      entityId: 3,
      entityName: 'Gaseosa',
      timestamp: '2023-05-20 11:30',
   },
   {
      id: 6,
      user: 'admin',
      action: 'create',
      entity: 'producto',
      entityId: 10,
      entityName: 'Pelota de Fútbol',
      timestamp: '2023-05-25 09:00',
   },
   {
      id: 7,
      user: 'admin',
      action: 'update',
      entity: 'producto',
      entityId: 10,
      entityName: 'Pelota de Fútbol',
      timestamp: '2023-05-25 10:00',
   },
   {
      id: 8,
      user: 'admin',
      action: 'delete',
      entity: 'producto',
      entityId: 10,
      entityName: 'Pelota de Fútbol',
      timestamp: '2023-05-25 11:00',
   },
]

const ActivityLog = () => {
   function getActionIcon(action: string, entity: string) {
      if (entity === 'reserva') {
         switch (action) {
            case 'create':
               return <CalendarCheck className="h-4 w-4 text-green-500" />
            case 'update':
               return <CalendarCog className="h-4 w-4 text-amber-500" />
            case 'delete':
               return <CalendarX className="h-4 w-4 text-red-500" />
         }
      } else if (entity === 'producto') {
         switch (action) {
            case 'create':
               return <PackageCheck className="h-4 w-4 text-green-500" />
            case 'update':
               return <PackageSearch className="h-4 w-4 text-amber-500" />
            case 'delete':
               return <PackageMinus className="h-4 w-4 text-red-500" />
         }
      } else if (entity === 'cliente') {
         switch (action) {
            case 'create':
               return <UserRoundPlus className="h-4 w-4 text-green-500" />
            case 'update':
               return <UserRoundPen className="h-4 w-4 text-amber-500" />
            case 'delete':
               return <UserRoundX className="h-4 w-4 text-red-500" />
         }
      }
   }

   function getActionText(action: string, entity: string, entityName: string) {
      if (action === 'create_reservation' || action === 'create') {
         return `Creación ${entity} "${entityName}"`
      } else if (action === 'update_reservation' || action === 'update') {
         return `Modificación ${entity} "${entityName}"`
      } else if (action === 'delete_reservation' || action === 'delete') {
         return `Eliminación ${entity} "${entityName}"`
      }

      return `Acción en ${entity} "${entityName}"`
   }

   function getActionClass(action: string) {
      if (action === 'create') {
         return 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
      } else if (action === 'update') {
         return 'bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800'
      } else if (action === 'delete') {
         return 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'
      }

      return 'bg-muted border-muted-foreground'
   }

   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
               <Activity className="h-4 w-4" />

               {activities?.length > 0 && (
                  <span
                     className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center 
                        rounded-full bg-red-500 text-[10px] text-white"
                  >
                     {activities.length}
                  </span>
               )}
            </Button>
         </PopoverTrigger>

         <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 border-b">
               <h3 className="font-medium">Actividades Recientes</h3>
               <p className="text-xs text-muted-foreground">
                  Últimas acciones realizadas en el sistema
               </p>
            </div>

            <div className="max-h-[310px] overflow-y-auto p-2">
               <div className="space-y-2">
                  {activities.map((activity) => (
                     <div
                        key={activity.id}
                        className={`p-2 rounded-md border ${getActionClass(
                           activity.action
                        )}`}
                     >
                        <div className="flex items-start gap-2">
                           {getActionIcon(activity.action, activity.entity)}

                           <div className="flex-1 space-y-1">
                              <p className="text-xs font-medium">
                                 {getActionText(
                                    activity.action,
                                    activity.entity,
                                    activity.entityName
                                 )}
                              </p>

                              <div className="flex justify-between text-[10px] text-muted-foreground">
                                 <span>Usuario: {activity.user}</span>
                                 <span>{activity.timestamp}</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="p-2 border-t">
               <Button variant="outline" size="sm" className="w-full">
                  Ver todas las actividades
               </Button>
            </div>
         </PopoverContent>
      </Popover>
   )
}

export default ActivityLog
