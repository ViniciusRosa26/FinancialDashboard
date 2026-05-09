import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/overviews': 'http://backend:8080',
      '/expenses': 'http://backend:8080',
      '/users': 'http://backend:8080',
      '/heritages': 'http://backend:8080',
      '/incomes': 'http://backend:8080',
    },
  },
})
