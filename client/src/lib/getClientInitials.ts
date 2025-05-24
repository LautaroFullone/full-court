export function getClientInitials(clientName: string) {
   return clientName
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
}
