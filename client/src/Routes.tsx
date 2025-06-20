import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard, Products, Clients } from '@pages'
import { ModalRender } from '@shared'
import { useAppTheme } from '@hooks'

function AppRoutes() {
   useAppTheme()

   return (
      <Router>
         <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/clientes" element={<Clients />} />
         </Routes>

         <ModalRender />
      </Router>
   )
}

export default AppRoutes
