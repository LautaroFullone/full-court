import { Tabs, TabsList, TabsTrigger } from '@shadcn'
import { Court, courts } from '@models'

interface CourtHandlerMobileProps {
   setSelectedCourt: (court: Court) => void
}

const CourtHandlerMobile: React.FC<CourtHandlerMobileProps> = ({ setSelectedCourt }) => {
   return (
      <div className="mt-4 flex justify-center">
         <Tabs defaultValue="1" className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
               {courts.map((court) => (
                  <TabsTrigger
                     value={String(court.id)}
                     onClick={() => setSelectedCourt(court)}
                  >
                     {court.name}
                  </TabsTrigger>
               ))}
            </TabsList>
         </Tabs>
      </div>
   )
}
export default CourtHandlerMobile
