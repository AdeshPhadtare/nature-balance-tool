import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: '/nature-balance-tool/',   // <-- REPLACE with your repo name
  plugins: [react()],
});
