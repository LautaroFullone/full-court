export * from './utils'

import { api } from './axios'
import { handleApiError } from './handleApiError'

import { formatDateToString } from './formatDateToString'
import { formatStringToDate } from './formatStringToDate'
import { getClientInitials } from './getClientInitials'
import { formatPriceDisplay } from './formatPriceDisplay'

import { reservationResolver } from './reservationResolver'
import { productResolver } from './productResolver'

export {
   api,
   formatDateToString,
   formatStringToDate,
   getClientInitials,
   handleApiError,
   formatPriceDisplay,
   reservationResolver,
   productResolver,
}
