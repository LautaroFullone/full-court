import { useState, useEffect } from 'react'

const useMobile = () => {
   const [isMobile, setIsMobile] = useState(false)

   useEffect(() => {
      function checkIfMobile() {
         setIsMobile(window.innerWidth < 768) // 768px es el breakpoint md de Tailwind
      }

      checkIfMobile()

      window.addEventListener('resize', checkIfMobile)

      return () => window.removeEventListener('resize', checkIfMobile)
   }, [])

   return isMobile
}

export default useMobile
