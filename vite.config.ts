import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig(() => {
  return {
    plugins: [react()],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          quietDeps: true,
        },
      },
    },
    resolve: {
      alias: {
        '~': path.resolve(process.cwd()),
        '@': path.resolve(process.cwd(), 'src'),
      },
    },
  }
});
