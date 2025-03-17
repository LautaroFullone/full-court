import { ArrowLeft, BarChart, CalendarDays, LogOut, Menu, ShoppingCart, Users } from 'lucide-react'
import { Button, Sheet, SheetContent, SheetTrigger } from '../ui'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ReactNode } from 'react'

const AppLayout = ({ children }: { children: ReactNode }) => {
   const { pathname } = useLocation()
   const navigate = useNavigate()

   const navItems = [
      { url: '/reservas', label: 'Reservas', icon: <CalendarDays className="h-4 w-4" /> },
      { url: '/clientes', label: 'Clientes', icon: <Users className="h-4 w-4" /> },
      { url: '/productos', label: 'Productos', icon: <ShoppingCart className="h-4 w-4" /> },
      { url: '/estadisticas', label: 'Estadísticas', icon: <BarChart className="h-4 w-4" /> },
   ]

   return (
      <div className="flex min-h-screen flex-col">
         <header className="sticky top-0 z-10 border-b bg-background">
            <div className="container flex h-16 items-center justify-between px-4 mx-auto">
               <div className="flex items-center gap-2">
                  {pathname !== '/' && (
                     <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                        <ArrowLeft className="h-4 w-4" />
                     </Button>
                  )}
                  <h1 className="text-xl font-bold">Full Reserve</h1>
               </div>

               {/* Navegación para pantallas medianas y grandes */}
               <nav className="hidden md:flex items-center gap-6">
                  {navItems.map((item) => (
                     <Link
                        key={item.url}
                        to={item.url}
                        className={`flex items-center gap-2 font-medium ${
                           pathname === item.url ||
                           (item.url !== '/' && pathname.startsWith(item.href))
                              ? 'text-primary'
                              : ''
                        }`}
                     >
                        {item.icon}
                        {item.label}
                     </Link>
                  ))}
               </nav>

               <div className="flex items-center gap-2">
                  <Button variant="ghost" onClick={() => {}} className="hidden md:flex">
                     <LogOut className="h-4 w-4 mr-2" />
                     Cerrar Sesión
                  </Button>

                  {/* Navegación para pequeñas pantallas */}
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
                           <Button
                              variant="ghost"
                              onClick={() => {}}
                              className="justify-start mt-4"
                           >
                              <LogOut className="h-4 w-4 mr-2" />
                              Cerrar Sesión
                           </Button>
                        </nav>
                     </SheetContent>
                  </Sheet>
               </div>
            </div>
         </header>

         <main className="flex-1">
            <div className="container px-4 py-6 mx-auto">{children}</div>
         </main>

         <footer className="border-t py-4">
            <div className="container px-4 text-center text-sm text-muted-foreground mx-auto">
               © 2025 Full Reserve. Todos los derechos reservados.
            </div>
         </footer>
      </div>
   )
}
export default AppLayout
