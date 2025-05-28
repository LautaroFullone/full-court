import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRoot } from 'react-dom/client'
import Routes from './Routes.tsx'

import './global.css'
import 'react-toastify/ReactToastify.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
   <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Routes />
   </QueryClientProvider>
)
