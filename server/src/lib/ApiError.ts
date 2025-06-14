export class ApiError extends Error {
   statusCode: number
   errorCode: string
   data?: any

   constructor(statusCode: number, errorCode: string, data?: any) {
      super(errorCode)
      this.name = 'ApiError'
      this.statusCode = statusCode
      this.errorCode = errorCode
      this.data = data
   }
}
