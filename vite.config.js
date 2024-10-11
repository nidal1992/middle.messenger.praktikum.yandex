import { resolve } from 'path';
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';

import handlebars from './handlebars-precompile';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        register: resolve(__dirname, 'register/index.html'),
      },
    },
  },
  server: {
    port: 3000,
  },
  plugins: [handlebars()],
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
});
