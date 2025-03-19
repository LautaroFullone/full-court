import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard, Products } from '@pages'
import { useAppTheme } from '@hooks'

function AppRoutes() {
   useAppTheme()

   return (
      <Router>
         <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/productos" element={<Products />} />
         </Routes>
      </Router>
   )
}

export default AppRoutes
