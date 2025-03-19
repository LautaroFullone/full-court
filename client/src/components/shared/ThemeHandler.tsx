import { Moon, Sun } from 'lucide-react'
import { useAppStore } from '@stores'
import { Button } from '@components'

const ThemeHandler = () => {
   const {
      theme,
      appActions: { toggleTheme },
   } = useAppStore()

   return (
      <Button variant="outline" size="icon" onClick={toggleTheme}>
         {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
   )
}
export default ThemeHandler
