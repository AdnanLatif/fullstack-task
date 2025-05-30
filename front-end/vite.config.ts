import { defineConfig } from 'vite'
import EnvironmentPlugin from 'vite-plugin-environment';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), EnvironmentPlugin(['VITE_API_URL']),],
})
