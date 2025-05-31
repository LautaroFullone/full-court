export function formatPriceDisplay(value: string | number): string {
   const number = typeof value === 'string' ? parseFloat(value) : value

   if (isNaN(number)) return ''

   return number.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
   })
}
