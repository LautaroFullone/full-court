import { Client, Court, Product, Reservation, ShiftType } from '@models'
import { devtools } from 'zustand/middleware'
import useAppStore from './useAppStore'
import { create } from 'zustand'

type ModalPayload = {
   'new-reservation': { selectedCourt: Court; selectedShift: ShiftType }
   'details-reservation': { reservation: Reservation }
   'confirm-reservation': void
   'new-product': { selectedProduct?: Product }
   'confirm-product': { product: Product }
   'new-client': void
   'edit-client': { selectedClient: Client }
   'confirm-delete-client': void
}

type ModalType = keyof ModalPayload

interface ModalStoreProps {
   modalFlags: Record<ModalType, boolean>

   modalActions: {
      openModal: <T extends ModalType>(
         name: T,
         ...payload: ModalPayload[T] extends void ? [] : [payload: ModalPayload[T]]
      ) => void
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
      'new-client': false,
      'edit-client': false,
      'confirm-delete-client': false,
   },
}

export const useModalStore = create<ModalStoreProps>()(
   devtools((set) => {
      const appActions = useAppStore.getState().appActions

      return {
         modalFlags: { ...INITIAL_STATE.modalFlags },

         modalActions: {
            openModal: (name, payload) => {
               switch (name) {
                  case 'new-reservation': {
                     const { selectedCourt, selectedShift } =
                        payload as ModalPayload['new-reservation']

                     appActions.dispatchSelectedCourt(selectedCourt)
                     appActions.dispatchSelectedShift(selectedShift)

                     break
                  }
                  case 'details-reservation': {
                     const { reservation } =
                        payload as ModalPayload['details-reservation']

                     appActions.dispatchSelectedReservation(reservation)
                     break
                  }
                  case 'new-product': {
                     const { selectedProduct } = payload as ModalPayload['new-product']
                     if (selectedProduct)
                        appActions.dispatchSelectedProduct(selectedProduct)
                     break
                  }
                  case 'confirm-product': {
                     const { product } = payload as ModalPayload['confirm-product']
                     appActions.dispatchSelectedProduct(product)
                     break
                  }
                  case 'edit-client': {
                     const { selectedClient } = payload as ModalPayload['edit-client']
                     appActions.dispatchSelectedClient(selectedClient)
                     break
                  }
               }

               set((state) => ({
                  modalFlags: { ...state.modalFlags, [name]: true },
               }))
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
