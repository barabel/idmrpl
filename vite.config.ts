import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type LibraryFormats } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'unplugin-dts/vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      dts({
        tsconfigPath: './tsconfig.app.json',
        bundleTypes: true,
      }),
    ],
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.tsx'),
        name: 'react-player',
        fileName: 'react-player',
        formats: ['es'] as LibraryFormats[],
      },
      rollupOptions: {
        external: id => /^(react|react-dom|react\/jsx-runtime)(\/.*)?$/.test(id),
      },
    },
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
  };
});
