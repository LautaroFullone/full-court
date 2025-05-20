import { Court, Product, Reservation, ShiftType } from '@models'
import { devtools } from 'zustand/middleware'
import useAppStore from './useAppStore'
import { create } from 'zustand'

type ModalType =
   | 'new-reservation'
   | 'details-reservation'
   | 'confirm-reservation'
   | 'new-product'
   | 'confirm-product'

type ModalPayload =
   | {
        name: 'new-reservation'
        selectedCourt: Court
        selectedShift: ShiftType
     }
   | { name: 'details-reservation'; reservation: Reservation }
   | { name: 'confirm-reservation' }
   | { name: 'new-product' }
   | { name: 'confirm-product'; product: Product }

interface ModalStoreProps {
   modalFlags: Record<ModalType, boolean>

   modalActions: {
      openModal: (payload: ModalPayload) => void
      closeModal: (modal: ModalType) => void
   }
}

const INITIAL_STATE: Omit<ModalStoreProps, 'modalActions'> = {
   modalFlags: {
      'new-reservation': false,
      'details-reservation': false,
      'confirm-reservation': false,
      'new-product': false,
      'confirm-product': false,
   },
}

export const useModalStore = create<ModalStoreProps>()(
   devtools((set) => {
      const { appActions } = useAppStore.getState()

      return {
         modalFlags: { ...INITIAL_STATE.modalFlags },

         modalActions: {
            openModal: (payload) => {
               switch (payload.name) {
                  case 'new-reservation':
                     appActions.dispatchSelectedCourt(payload.selectedCourt)
                     appActions.dispatchSelectedShift(payload.selectedShift)
                     set((state) => ({
                        modalFlags: { ...state.modalFlags, 'new-reservation': true },
                     }))
                     break

                  case 'details-reservation':
                     appActions.dispatchSelectedReservation(payload.reservation)
                     set((state) => ({
                        modalFlags: { ...state.modalFlags, 'details-reservation': true },
                     }))
                     break
                  case 'confirm-reservation':
                     set((state) => ({
                        modalFlags: { ...state.modalFlags, 'confirm-reservation': true },
                     }))
                     break
                  case 'new-product':
                     set((state) => ({
                        modalFlags: { ...state.modalFlags, 'new-product': true },
                     }))
                     break
                  case 'confirm-product':
                     appActions.dispatchSelectedProduct(payload.product)
                     set((state) => ({
                        modalFlags: { ...state.modalFlags, 'confirm-product': true },
                     }))
                     break

                  default:
                     console.warn(`Modal is not defined`)
                     break
               }
            },
            closeModal: (modal) => {
               set((state) => ({
                  modalFlags: { ...state.modalFlags, [modal]: false },
               }))
            },
         },
      }
   })
)

export default useModalStore
