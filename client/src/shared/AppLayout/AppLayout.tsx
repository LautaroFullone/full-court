import { ArrowLeft, BarChart, LogOut, ShoppingCart, Users } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import MobileSidebar from './MobileSidebar'
import ThemeHandler from './ThemeHandler'
import ActivityLog from './ActivityLog'
import { useAppStore } from '@stores'
import { ReactNode } from 'react'
import { Button } from '@shadcn'

export type NavItem = {
   url: string
   label: string
   icon: ReactNode
}

const navItems: NavItem[] = [
   { url: '/clientes', label: 'Clientes', icon: <Users className="h-4 w-4" /> },
   {
      url: '/productos',
      label: 'Productos',
      icon: <ShoppingCart className="h-4 w-4" />,
   },
   {
      url: '/estadisticas',
      label: 'Estadísticas',
      icon: <BarChart className="h-4 w-4" />,
   },
]

const AppLayout = ({ children }: { children: ReactNode }) => {
   const theme = useAppStore((state) => state.theme)

   const { pathname } = useLocation()
   const navigate = useNavigate()

   const isHomePage = pathname === '/'

   return (
      <>
         <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-10 border-b bg-background">
               <div className="container flex h-16 items-center justify-between px-4 mx-auto">
                  <div className="flex items-center gap-2">
                     {!isHomePage && (
                        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                           <ArrowLeft className="h-4 w-4" aria-label="Volver al inicio" />
                        </Button>
                     )}

                     <div className="flex items-center gap-2">
                        <img
                           src="/court.png"
                           alt="FullCourt Logo"
                           width={32}
                           height={32}
                           className="rounded-md"
                        />

                        <h1 className="text-xl font-bold">FullCourt</h1>
                     </div>
                  </div>

                  <nav className="hidden md:flex items-center gap-6">
                     {navItems.map((item) => (
                        <Link
                           key={item.url}
                           to={item.url}
                           className={`flex items-center gap-2 font-medium ${
                              pathname === item.url ||
                              (item.url !== '/' && pathname.startsWith(item.url))
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
                     <ActivityLog />
                     <ThemeHandler />

                     <Button
                        variant="ghost"
                        onClick={() => {}}
                        className="hidden md:flex"
                     >
                        <LogOut className="h-4 w-4 mr-2" />
                        Cerrar Sesión
                     </Button>

                     {/* Navegación para pequeñas pantallas */}
                     <MobileSidebar navItems={navItems} />
                  </div>
               </div>
            </header>

            <main className="flex-1">
               <div className="container px-4 py-6 mx-auto">{children}</div>
            </main>

            <footer>
               <div className="container px-4 text-center text-sm text-muted-foreground mx-auto">
                  ©2025 FullCourt - Todos los derechos reservados.
               </div>
            </footer>
         </div>

         <ToastContainer
            position="bottom-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme={theme === 'dark' ? 'dark' : 'light'}
         />
      </>
   )
}
export default AppLayout
