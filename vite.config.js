import { resolve } from 'path';
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: false,
    minify: true,
  },
  // server: {
  //   port: 3000,
  // },
  // preview: {
  //   port: 3000,
  // },

  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
});
