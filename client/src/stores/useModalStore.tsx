import { Client, Court, Product, Reservation, ShiftType } from '@models'
import { devtools } from 'zustand/middleware'
import useAppStore from './useAppStore'
import { create } from 'zustand'

type ModalPayload = {
   'create-reservation': { court: Court; shift: ShiftType }
   'edit-reservation': { reservation: Reservation }
   'details-reservation': { reservation: Reservation }
   'confirm-reservation': { reservation: Reservation }
   'create-product': void
   'edit-product': { product: Product }
   'confirm-delete-product': { product: Product }
   'create-client': void
   'edit-client': { client: Client }
   'confirm-delete-client': void
}

type ModalType = keyof ModalPayload

type ModalEntry<T extends ModalType = ModalType> = {
   name: T
   payload?: ModalPayload[T]
}

interface ModalStoreProps {
   currentModal: ModalEntry | null
   previousModal: ModalEntry | null

   modalActions: {
      openModal: <T extends ModalType>(
         name: T,
         ...payload: ModalPayload[T] extends void ? [] : [ModalPayload[T]]
      ) => void
      closeModal: (name: ModalType) => void
   }
}

const useModalStore = create<ModalStoreProps>()(
   devtools(
      (set, get) => {
         const appActions = useAppStore.getState().appActions
         const selectedReservation = useAppStore.getState().selectedReservation

         return {
            currentModal: null,
            previousModal: null,

            modalActions: {
               openModal: (name, payload) => {
                  const { currentModal } = get()

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
                     case 'confirm-reservation': {
                        const { reservation } =
                           payload as ModalPayload['confirm-reservation']

                        if (selectedReservation?.id !== reservation.id) {
                           appActions.dispatchSelectedReservation(reservation)
                        }
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

                  if (currentModal && currentModal.name !== name) {
                     set({
                        previousModal: currentModal,
                        currentModal: { name, payload },
                     })
                  } else {
                     set({ currentModal: { name, payload } })
                  }
               },

               closeModal: (name) => {
                  const { currentModal, previousModal } = get()

                  if (currentModal?.name !== name) return

                  if (previousModal) {
                     set({
                        currentModal: previousModal,
                        previousModal: null,
                     })
                  } else {
                     set({ currentModal: null })
                  }
               },
            },
         }
      },
      { name: 'ModalStore' }
   )
)

export default useModalStore
