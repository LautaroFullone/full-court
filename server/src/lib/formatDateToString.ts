import { formatStringToDate } from './formatStringToDate'

export function formatDateToString(date: Date | string, isForCalendar?: boolean) {
   const dateObj = typeof date === 'string' ? formatStringToDate(date) : date

   console.log('formatDateToString', dateObj)
   return (
      dateObj.toLocaleString('es-ES', {
         ...(isForCalendar ? { weekday: 'long' } : {}),
         day: '2-digit',
         month: isForCalendar ? 'long' : '2-digit',
         year: 'numeric',
      }) || 'Date error'
   )
}
