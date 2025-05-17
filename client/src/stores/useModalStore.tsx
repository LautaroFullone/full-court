import { Court, Reservation, ShiftType } from '@models'
import useAppStore from './useAppStore'
import { create } from 'zustand'

type ModalType = 'new-reservation' | 'details-reservation'

type ModalPayload =
   | {
        modal: 'new-reservation'
        selectedCourt: Court
        selectedShift: ShiftType
     }
   | { modal: 'details-reservation'; reservation: Reservation }

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
   },
}

export const useModalStore = create<ModalStoreProps>((set) => {
   const { appActions } = useAppStore.getState()

   return {
      modalFlags: { ...INITIAL_STATE.modalFlags },

      modalActions: {
         openModal: (payload) => {
            switch (payload.modal) {
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

export default useModalStore
