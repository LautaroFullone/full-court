import { devtools } from 'zustand/middleware'
import { create } from 'zustand'
import { Reservation } from '@models'

interface AppStoreProps {
   theme: 'light' | 'dark'
   selectedDate: Date
   selectedReservation: Reservation | null

   appActions: {
      toggleTheme: () => void
      dispatchSelectedDate: (date: Date) => void
      dispatchSelectedReservation: (reservation: Reservation | null) => void
   }
}

const INITIAL_STATE: Omit<AppStoreProps, 'appActions'> = {
   theme: 'dark',
   selectedDate: new Date(),
   selectedReservation: null,
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
         dispatchSelectedReservation: (date: Date) => {
            set({ selectedDate: date })
         },
      },
   }))
)

export default useAppStore
