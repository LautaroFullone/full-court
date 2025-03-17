import { useState } from 'react'

const useCalendar = () => {
   const [currentDate, setCurrentDate] = useState(new Date())

   const goOneDayBack = () => {
      const newDate = new Date(currentDate)
      newDate.setDate(currentDate.getDate() - 1)
   }

   const goOneDayNext = () => {
      const newDate = new Date(currentDate)
      newDate.setDate(currentDate.getDate() + 1)
   }

   return {
      currentDate,
      goToDate: setCurrentDate,
      goOneDayBack,
      goOneDayNext,
   }
}

export default useCalendar
