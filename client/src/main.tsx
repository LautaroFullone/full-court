import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import Routes from './Routes.tsx'

import './global.css'

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <Routes />
   </StrictMode>
)
