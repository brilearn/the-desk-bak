import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { config } from 'dotenv';

// Load environment variables from .env file
config();

// https://vitejs.dev/config/
export default defineConfig({
  // Your Vite configuration
  define: {
    'process.env': process.env
  },
  plugins: [react({
    include: "**/*.tsx",
  })],
  server: {
    watch: {
      usePolling: true
    }
  },

  resolve: {
    alias: {
      src: "/src",
      '@': path.resolve(__dirname, './src'),
      components: "/src/components",
      assets: "/src/assets",
      lib: "/src/lib",
      contexts: "/src/contexts",
      constants: "/src/constants",
      utils: "/src/utils",
      assests: "/src/assests",
    },
  },
})
