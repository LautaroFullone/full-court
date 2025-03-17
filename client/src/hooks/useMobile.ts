import { useState, useEffect } from 'react'

const useMobile = () => {
   const [isMobile, setIsMobile] = useState(false)

   useEffect(() => {
      function checkIfMobile() {
         setIsMobile(window.innerWidth < 768) // 768px es el breakpoint md de Tailwind
      }

      // Verificar al cargar
      checkIfMobile()

      // Agregar listener para cambios de tamaño
      window.addEventListener('resize', checkIfMobile)

      // Limpiar listener
      return () => window.removeEventListener('resize', checkIfMobile)
   }, [])

   return isMobile
}

export default useMobile
