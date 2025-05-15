import { Court, ShiftType } from '@models'
import useAppStore from './useAppStore'
import { create } from 'zustand'

type ModalType = 'new-reservation' | 'edit-reservation' | 'delete-reservation'

type ModalPayload =
   | {
        modal: 'new-reservation'
        selectedCourt: Court
        selectedShift: ShiftType
     }
   | { modal: 'edit-reservation'; reservationId: string }
   | { modal: 'delete-reservation'; reservationId: string }

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
      'edit-reservation': false,
      'delete-reservation': false,
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

               case 'edit-reservation':
                  console.log(`Editing reservation with ID: ${payload.reservationId}`)
                  set((state) => ({
                     modalFlags: { ...state.modalFlags, 'edit-reservation': true },
                  }))
                  break

               case 'delete-reservation':
                  console.log(`Deleting reservation with ID: ${payload.reservationId}`)
                  set((state) => ({
                     modalFlags: { ...state.modalFlags, 'delete-reservation': true },
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
