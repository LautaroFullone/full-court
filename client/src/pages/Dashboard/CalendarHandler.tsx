import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from '@shadcn'
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCalendar } from '@hooks'
import { es } from 'date-fns/locale'

const CalendarHandler: React.FC = () => {
   const {
      selectedDate,
      isCalendarOpen,
      toggleCalendar,
      goToDate,
      goOneDayBack,
      goOneDayNext,
   } = useCalendar()

   const formattedDate = selectedDate.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
   })

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
                     {formattedDate}
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
