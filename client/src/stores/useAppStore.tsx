import { Client, Court, Product, Reservation, ShiftType } from '@models'
import { devtools } from 'zustand/middleware'
import { create } from 'zustand'

function getToday(): Date {
   const now = new Date()
   return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

interface AppStoreProps {
   theme: 'light' | 'dark'
   selectedCategory: string
   selectedClient: Client | null
   selectedCourt: Court | null
   selectedDate: Date
   selectedProduct: Product | null
   selectedReservation: Reservation | null
   selectedShift: ShiftType | null

   appActions: {
      toggleTheme: () => void
      dispatchSelectedCategory: (category: string) => void
      dispatchSelectedClient: (client: Client | null) => void
      dispatchSelectedCourt: (court: Court | null) => void
      dispatchSelectedDate: (date: Date) => void
      dispatchSelectedProduct: (product: Product | null) => void
      dispatchSelectedReservation: (reservation: Reservation | null) => void
      dispatchSelectedShift: (shift: ShiftType | null) => void
   }
}

const INITIAL_STATE: Omit<AppStoreProps, 'appActions'> = {
   theme: 'light',
   selectedCategory: 'todos',
   selectedClient: null,
   selectedCourt: null,
   selectedDate: getToday(),
   selectedProduct: null,
   selectedReservation: null,
   selectedShift: null,
}

const useAppStore = create<AppStoreProps>()(
   devtools(
      (set, get) => ({
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
            dispatchSelectedCategory: (category: string) => {
               set({ selectedCategory: category })
            },
            dispatchSelectedClient: (client: Client) => {
               set({ selectedClient: client })
            },
            dispatchSelectedCourt: (court: Court) => {
               set({ selectedCourt: court })
            },
            dispatchSelectedDate: (date: Date) => {
               set({ selectedDate: date })
            },
            dispatchSelectedProduct: (product: Product) => {
               set({ selectedProduct: product })
            },
            dispatchSelectedReservation: (reservation: Reservation) => {
               set({ selectedReservation: reservation })
            },
            dispatchSelectedShift: (shift: ShiftType) => {
               set({ selectedShift: shift })
            },
         },
      }),
      { name: 'AppStore' }
   )
)

export default useAppStore
