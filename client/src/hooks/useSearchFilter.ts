import { useMemo, useState } from 'react'

const useSearchFilter = <T>(values: T[], fieldsToSearch: (keyof T)[]) => {
   const [searchTerm, setSearchTerm] = useState('')

   const filteredValues = useMemo(() => {
      const term = searchTerm.toLowerCase()

      return values.filter((value) =>
         fieldsToSearch.some((field) => {
            return String(value[field]).toLowerCase().includes(term)
         })
      )
   }, [values, searchTerm, fieldsToSearch])

   return {
      searchTerm,
      setSearchTerm,
      filteredValues,
   }
}

export default useSearchFilter
