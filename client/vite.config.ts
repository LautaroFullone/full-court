import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
   plugins: [react(), tailwindcss()],
   resolve: {
      alias: {
         '@': path.resolve(__dirname, './src'),
         '@config': path.resolve(__dirname, './src/config/constants'),
         '@hooks': path.resolve(__dirname, './src/hooks'),
         '@lib': path.resolve(__dirname, './src/lib'),
         '@models': path.resolve(__dirname, './src/models'),
         '@pages': path.resolve(__dirname, './src/pages'),
         '@stores': path.resolve(__dirname, './src/stores'),
         '@shared': path.resolve(__dirname, './src/shared'),
         '@shadcn': path.resolve(__dirname, './src/shared/ui'),
      },
   },
})
