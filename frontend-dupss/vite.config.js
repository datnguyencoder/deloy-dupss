import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 👈 Cho phép nhận kết nối từ bên ngoài (VD: domain, IP)
    allowedHosts: ['dupssapp.id.vn'], // 👈 Cho phép host custom
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
