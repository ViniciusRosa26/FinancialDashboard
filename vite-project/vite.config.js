import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/overviews': 'http://localhost:8080',
      '/expenses': 'http://localhost:8080',
      '/users': 'http://localhost:8080',
      '/heritages': 'http://localhost:8080',
      '/incomes': 'http://localhost:8080',
    },
  },
})
