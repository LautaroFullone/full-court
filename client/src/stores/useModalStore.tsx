import { Client, Court, Product, Reservation, ShiftType } from '@models'
import { devtools } from 'zustand/middleware'
import useAppStore from './useAppStore'
import { create } from 'zustand'

type ModalPayload = {
   'create-reservation': { court: Court; shift: ShiftType }
   'edit-reservation': { reservation: Reservation }
   'details-reservation': { reservation: Reservation }
   'confirm-reservation': void
   'create-product': void
   'edit-product': { product: Product }
   'confirm-delete-product': { product: Product }
   'create-client': void
   'edit-client': { client: Client }
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
      'create-reservation': false,
      'edit-reservation': false,
      'details-reservation': false,
      'confirm-reservation': false,
      'create-product': false,
      'edit-product': false,
      'confirm-delete-product': false,
      'create-client': false,
      'edit-client': false,
      'confirm-delete-client': false,
   },
}

export const useModalStore = create<ModalStoreProps>()(
   devtools(
      (set) => {
         const appActions = useAppStore.getState().appActions

         return {
            modalFlags: { ...INITIAL_STATE.modalFlags },

            modalActions: {
               openModal: (name, payload) => {
                  switch (name) {
                     case 'create-reservation': {
                        const { court, shift } =
                           payload as ModalPayload['create-reservation']

                        appActions.dispatchSelectedCourt(court)
                        appActions.dispatchSelectedShift(shift)
                        break
                     }
                     case 'details-reservation': {
                        const { reservation } =
                           payload as ModalPayload['details-reservation']

                        appActions.dispatchSelectedReservation(reservation)
                        break
                     }
                     case 'edit-reservation': {
                        const { reservation } =
                           payload as ModalPayload['edit-reservation']

                        appActions.dispatchSelectedReservation(reservation)
                        break
                     }
                     case 'edit-product': {
                        const { product } = payload as ModalPayload['edit-product']

                        appActions.dispatchSelectedProduct(product)
                        break
                     }
                     case 'confirm-delete-product': {
                        const { product } =
                           payload as ModalPayload['confirm-delete-product']

                        appActions.dispatchSelectedProduct(product)
                        break
                     }
                     case 'edit-client': {
                        const { client } = payload as ModalPayload['edit-client']

                        appActions.dispatchSelectedClient(client)
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
      },
      { name: 'ModalStore' }
   )
)

export default useModalStore
