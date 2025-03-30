export function formatDateToString(date: Date, isForCalendar: boolean = false) {
   return (
      date.toLocaleString('es-ES', {
         ...(isForCalendar ? { weekday: 'long' } : {}),
         day: '2-digit',
         month: isForCalendar ? 'long' : '2-digit',
         year: 'numeric',
      }) || 'Date error'
   )
}
