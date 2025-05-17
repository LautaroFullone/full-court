import { devtools } from 'zustand/middleware'
import { create } from 'zustand'
import { Court, Reservation, ShiftType } from '@models'

interface AppStoreProps {
   theme: 'light' | 'dark'
   selectedDate: Date
   selectedCourt: Court | null
   selectedShift: ShiftType | null
   selectedReservation: Reservation | null

   appActions: {
      toggleTheme: () => void
      dispatchSelectedDate: (date: Date) => void
      dispatchSelectedCourt: (court: Court) => void
      dispatchSelectedShift: (shift: ShiftType) => void
      dispatchSelectedReservation: (reservation: Reservation) => void
   }
}

const INITIAL_STATE: Omit<AppStoreProps, 'appActions'> = {
   theme: 'light',
   selectedDate: new Date(),
   selectedCourt: null,
   selectedShift: null,
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
         dispatchSelectedCourt: (court: Court) => {
            set({ selectedCourt: court })
         },
         dispatchSelectedShift: (shift: ShiftType) => {
            set({ selectedShift: shift })
         },
         dispatchSelectedReservation: (reservation: Reservation) => {
            set({ selectedReservation: reservation })
         },
      },
   }))
)

export default useAppStore
