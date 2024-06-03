import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://api.faculdadedalavanderia.com.br',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false, // Adicione isso se o servidor usar HTTPS com certificado auto-assinado
      }
    }
  }
});
