import { useAppStore } from '@stores'
import { useState } from 'react'

const useCalendar = () => {
   const [isCalendarOpen, setIsCalendarOpen] = useState(false)

   const selectedDate = useAppStore((state) => state.selectedDate)
   const dispatchSelectedDate = useAppStore(
      (state) => state.appActions.dispatchSelectedDate
   )

   const toggleCalendar = () => {
      setIsCalendarOpen(!isCalendarOpen)
   }

   const goToDate = (date: Date | undefined) => {
      if (date) {
         console.log('## goToDate: ', date)

         dispatchSelectedDate(date)
         setIsCalendarOpen(false)

         //TODO: fetch date reservations
      }
   }

   const goOneDayBack = () => {
      const newDate = new Date(selectedDate)
      newDate.setDate(selectedDate.getDate() - 1)
      goToDate(newDate)
   }

   const goOneDayNext = () => {
      const newDate = new Date(selectedDate)
      newDate.setDate(selectedDate.getDate() + 1)
      goToDate(newDate)
   }

   return {
      selectedDate,
      isCalendarOpen,
      goToDate,
      goOneDayBack,
      goOneDayNext,
      toggleCalendar,
   }
}

export default useCalendar
