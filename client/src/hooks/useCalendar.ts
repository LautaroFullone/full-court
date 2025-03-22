// import { useAppStore } from '@stores'
import { useState } from 'react'

const useCalendar = () => {
   const [isCalendarOpen, setIsCalendarOpen] = useState(false)
   const [selectedDate, setSelectedDate] = useState(new Date())
   // const {
   //    selectedDate,
   //    appActions: { dispatchSelectedDate },
   // } = useAppStore()

   const toggleCalendar = () => {
      setIsCalendarOpen(!isCalendarOpen)
   }

   const goToDate = (date: Date | undefined) => {
      if (date) {
         // console.log('## date change: ', date)
         // dispatchSelectedDate(date)W
         setSelectedDate(date)
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
