import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 5174,
    allowedHosts: ['admin.abhitprints.in', 'www.admin.abhitprints.in', 'localhost']
  }
});
