import { create } from 'zustand'
import useAppStore from './useAppStore'
import { Court, ShiftType } from '@models'

interface ModalStoreProps {
   isNewReservationModalOpen: boolean

   modalActions: {
      openNewReservationModal: (selectedCourt: Court, selectedShift: ShiftType) => void
      closeNewReservationModal: () => void
   }
}

const INITIAL_STATE: Omit<ModalStoreProps, 'modalActions'> = {
   isNewReservationModalOpen: false,
}

export const useModalStore = create<ModalStoreProps>((set) => {
   const { appActions } = useAppStore.getState()

   return {
      ...INITIAL_STATE,

      modalActions: {
         openNewReservationModal: (selectedCourt: Court, selectedShift: ShiftType) => {
            //TODO: terminar este metodo
            appActions.dispatchSelectedCourt(selectedCourt)
            appActions.dispatchSelectedShift(selectedShift)
            set({ isNewReservationModalOpen: true })
         },
         closeNewReservationModal: () => {
            set({ isNewReservationModalOpen: false })
         },
      },
   }
})

export default useModalStore
