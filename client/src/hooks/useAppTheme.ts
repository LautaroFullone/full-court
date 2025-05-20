import { useAppStore } from '@stores'
import { useEffect } from 'react'

const useAppTheme = () => {
   const theme = useAppStore((state) => state.theme)

   useEffect(() => {
      if (theme === 'dark') {
         document.querySelector('body')!.classList.add('dark')
      } else {
         document.querySelector('body')!.classList.remove('dark')
      }
   }, [theme])
}

export default useAppTheme
