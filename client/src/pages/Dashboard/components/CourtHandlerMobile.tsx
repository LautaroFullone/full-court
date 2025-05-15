import { Tabs, TabsList, TabsTrigger } from '@shadcn'
import { useAppStore } from '@stores'
import { COURTS } from '@config'

const CourtHandlerMobile: React.FC = () => {
   const {
      appActions: { dispatchSelectedCourt },
   } = useAppStore()

   return (
      <div className="mt-4 flex justify-center">
         <Tabs defaultValue="1" className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
               {COURTS.map((court) => (
                  <TabsTrigger
                     value={court.id}
                     onClick={() => dispatchSelectedCourt(court)}
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
