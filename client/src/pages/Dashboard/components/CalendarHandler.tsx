import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from '@shadcn'
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { formatDateToString } from '@lib'
import { useCalendar } from '@hooks'
import { es } from 'date-fns/locale'
import { useMemo } from 'react'

const CalendarHandler: React.FC = () => {
   const {
      selectedDate,
      isCalendarOpen,
      toggleCalendar,
      goToDate,
      goOneDayBack,
      goOneDayNext,
   } = useCalendar()

   const formatedDate = useMemo(
      () => formatDateToString(selectedDate, true),
      [selectedDate]
   )

   return (
      <div className="flex items-center space-x-2">
         <Button variant="outline" size="icon" onClick={goOneDayBack}>
            <ChevronLeft className="h-4 w-4" />
         </Button>

         <Popover open={isCalendarOpen} onOpenChange={toggleCalendar}>
            <PopoverTrigger asChild>
               <Button
                  variant="outline"
                  className="flex items-center gap-2 flex-1 sm:flex-initial"
               >
                  <CalendarIcon className="h-4 w-4" />

                  <span className="font-medium capitalize text-sm sm:text-base truncate">
                     {formatedDate}
                  </span>
               </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
               <Calendar
                  selected={selectedDate}
                  onSelect={goToDate}
                  mode="single"
                  locale={es}
               />
            </PopoverContent>
         </Popover>

         <Button variant="outline" size="icon" onClick={goOneDayNext}>
            <ChevronRight className="h-4 w-4" />
         </Button>
      </div>
   )
}
export default CalendarHandler
