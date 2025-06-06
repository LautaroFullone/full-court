import { formatDateToString, formatStringToDate } from '@lib'
import { useAppStore } from '@stores'
import { useState } from 'react'

const useCalendar = () => {
   const selectedDate = useAppStore((state) => state.selectedDate)
   const dispatchSelectedDate = useAppStore(
      (state) => state.appActions.dispatchSelectedDate
   )

   const [isCalendarOpen, setIsCalendarOpen] = useState(false)

   const toggleCalendar = () => setIsCalendarOpen(!isCalendarOpen)

   const goToDate = (date: Date | string | undefined) => {
      if (!date) return

      // const dateObj = typeof date === 'string' ? new Date(date) : date

      const parsedDate = formatDateToString(date)
      console.log('## goToDate', parsedDate)

      dispatchSelectedDate(parsedDate)
      setIsCalendarOpen(false)
   }

   const goOneDayBack = () => {
      const currentDate = formatStringToDate(selectedDate)
      currentDate.setDate(currentDate.getDate() - 1)
      goToDate(currentDate)
   }

   const goOneDayNext = () => {
      const currentDate = formatStringToDate(selectedDate)
      currentDate.setDate(currentDate.getDate() + 1)
      goToDate(currentDate)
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
