import { useAppStore } from '@stores'
import { useEffect } from 'react'

const useAppTheme = () => {
   const { theme } = useAppStore()

   useEffect(() => {
      if (theme === 'dark') {
         document.querySelector('body')!.classList.add('dark')
      } else {
         document.querySelector('body')!.classList.remove('dark')
      }
   }, [theme])
}

export default useAppTheme
