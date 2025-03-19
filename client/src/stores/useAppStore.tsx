import { devtools } from 'zustand/middleware'
import { create } from 'zustand'

interface AppStoreProps {
   theme: 'light' | 'dark'
   selectedDate: Date

   appActions: {
      toggleTheme: () => void
      dispatchSelectedDate: (date: Date) => void
   }
}

const INITIAL_STATE: Omit<AppStoreProps, 'appActions'> = {
   theme: 'light',
   selectedDate: new Date(),
}

const useAppStore = create<AppStoreProps>()(
   devtools((set, get) => ({
      ...INITIAL_STATE,

      appActions: {
         toggleTheme: () => {
            const { theme: previousTheme } = get()

            if (previousTheme === 'dark') {
               set({ theme: 'light' })
            } else {
               set({ theme: 'dark' })
            }
         },
         dispatchSelectedDate: (date: Date) => {
            set({ selectedDate: date })
         },
      },
   }))
)

export default useAppStore
