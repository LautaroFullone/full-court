import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard, Products, Clients } from '@pages'
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
      </Router>
   )
}

export default AppRoutes
