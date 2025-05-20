import { devtools } from 'zustand/middleware'
import { create } from 'zustand'
import { Court, Product, Reservation, ShiftType } from '@models'

interface AppStoreProps {
   theme: 'light' | 'dark'
   selectedDate: Date
   selectedCategory: string
   selectedCourt: Court | null
   selectedProduct: Product | null
   selectedShift: ShiftType | null
   selectedReservation: Reservation | null

   appActions: {
      toggleTheme: () => void
      dispatchSelectedDate: (date: Date) => void
      dispatchSelectedCategory: (category: string) => void
      dispatchSelectedCourt: (court: Court) => void
      dispatchSelectedProduct: (product: Product) => void
      dispatchSelectedShift: (shift: ShiftType) => void
      dispatchSelectedReservation: (reservation: Reservation) => void
   }
}

const INITIAL_STATE: Omit<AppStoreProps, 'appActions'> = {
   theme: window.matchMedia?.('(prefers-color-scheme:dark)')?.matches ? 'light' : 'dark',
   selectedDate: new Date(),
   selectedCategory: 'todos',
   selectedCourt: null,
   selectedProduct: null,
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
         dispatchSelectedCategory: (category: string) => {
            set({ selectedCategory: category })
         },
         dispatchSelectedCourt: (court: Court) => {
            set({ selectedCourt: court })
         },
         dispatchSelectedProduct: (product: Product) => {
            set({ selectedProduct: product })
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
