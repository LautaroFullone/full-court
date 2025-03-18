import { useState } from 'react'

const useCalendar = () => {
   const [isCalendarOpen, setIsCalendarOpen] = useState(false)
   const [currentDate, setCurrentDate] = useState(new Date())

   const toggleCalendar = () => {
      setIsCalendarOpen(!isCalendarOpen)
   }

   const goToDate = (date: Date | undefined) => {
      if (date) {
         console.log('## date change: ', date)
         setCurrentDate(date)
         setIsCalendarOpen(false)

         //TODO: fetch date reservations
      }
   }

   const goOneDayBack = () => {
      const newDate = new Date(currentDate)
      newDate.setDate(currentDate.getDate() - 1)
      goToDate(newDate)
   }

   const goOneDayNext = () => {
      const newDate = new Date(currentDate)
      newDate.setDate(currentDate.getDate() + 1)
      goToDate(newDate)
   }

   return {
      currentDate,
      isCalendarOpen,
      goToDate,
      goOneDayBack,
      goOneDayNext,
      toggleCalendar,
   }
}

export default useCalendar
