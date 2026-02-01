import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [
    tailwindcss(), // 1st: Process CSS first
    react(),        // 2nd: Then handle React
  ],
})