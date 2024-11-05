import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy:{
  "/tabla-parametros":'http://localhost:3001',
  "/acudiente":'http://localhost:3001',
  "/cita":'http://localhost:3001',
  "/condiciones":'http://localhost:3001',
  "/documentacion":'http://localhost:3001',
  "/especialista":'http://localhost:3001',
  "/historico":'http://localhost:3001',
  "/paciente":'http://localhost:3001',
    }
  }
})

