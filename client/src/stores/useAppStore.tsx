import { Client, Court, Product, Reservation, ShiftType } from '@models'
import { devtools } from 'zustand/middleware'
import { formatDateToString } from '@lib'
import { create } from 'zustand'

function getToday() {
   const now = new Date()
   return formatDateToString(now)
}

interface AppStoreProps {
   theme: 'light' | 'dark'
   selectedCategory: string
   selectedClient: Client | null
   selectedCourt: Court | null
   selectedDate: string
   selectedProduct: Product | null
   selectedReservation: Reservation | null
   selectedShift: ShiftType | null

   appActions: {
      toggleTheme: () => void
      dispatchSelectedCategory: (category: string) => void
      dispatchSelectedClient: (client: Client | null) => void
      dispatchSelectedCourt: (court: Court | null) => void
      dispatchSelectedDate: (dateStr: string) => void
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
            dispatchSelectedDate: (dateStr: string) => {
               set({ selectedDate: dateStr })
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
