import { Moon, Sun } from 'lucide-react'
import { useAppStore } from '@stores'
import { Button } from '@shadcn'

const ThemeHandler = () => {
   const theme = useAppStore((state) => state.theme)
   const toggleTheme = useAppStore((state) => state.appActions.toggleTheme)

   return (
      <Button variant="outline" size="icon" onClick={toggleTheme}>
         {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
   )
}
export default ThemeHandler
