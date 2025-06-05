export function parseDate(dateStr: string): Date {
   const [day, month, year] = dateStr.split('/').map(Number)
   return new Date(year, month - 1, day, 0, 0, 0, 0) // El mes es base 0
}
