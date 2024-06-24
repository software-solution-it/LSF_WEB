import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
       // target: 'https://api.faculdadedelavanderia.com.br',
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: true
      }
    }
  },
  build: {
    rollupOptions: {
      external: ['pdfjs-dist/build/pdf.worker.entry'],
    },
  },
});
