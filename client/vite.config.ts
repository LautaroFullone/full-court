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
         '@components': path.resolve(__dirname, './src/components'),
         '@hooks': path.resolve(__dirname, './src/hooks'),
         '@lib': path.resolve(__dirname, './src/lib'),
         '@pages': path.resolve(__dirname, './src/pages'),
      },
   },
})
