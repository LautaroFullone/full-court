import { Button, Sheet, SheetContent, SheetTrigger } from '@components'
import { Link, useLocation } from 'react-router-dom'
import { LogOut, Menu } from 'lucide-react'
import { NavItem } from '@models'

interface MobileSidebarProps {
   navItems: NavItem[]
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ navItems }) => {
   const { pathname } = useLocation()

   return (
      <Sheet>
         <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
               <Menu className="h-5 w-5" />
            </Button>
         </SheetTrigger>

         <SheetContent side="right" className="w-[250px] sm:w-[300px]">
            <nav className="flex flex-col gap-4 mt-8">
               {navItems.map((item) => (
                  <Link
                     key={item.url}
                     to={item.url}
                     className={`flex items-center gap-2 p-2 rounded-md hover:bg-muted ${
                        pathname === item.url ||
                        (item.url !== '/' && pathname.startsWith(item.url))
                           ? 'bg-muted font-medium'
                           : ''
                     }`}
                  >
                     {item.icon}
                     {item.label}
                  </Link>
               ))}

               <Button variant="outline" onClick={() => {}} className="mx-2">
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
               </Button>
            </nav>
         </SheetContent>
      </Sheet>
   )
}
export default MobileSidebar
