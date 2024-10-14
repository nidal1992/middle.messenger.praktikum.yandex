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
        login: resolve(__dirname, 'src', 'index.html'),
        register: resolve(
          __dirname,
          'src',
          'demonstrate-routes',
          'register',
          'index.html',
        ),
        main: resolve(
          __dirname,
          'src',
          'demonstrate-routes',
          'main-page',
          'index.html',
        ),
        settingsProfile: resolve(
          __dirname,
          'src',
          'demonstrate-routes',
          'settings-profile',
          'index.html',
        ),
        settingsEdit: resolve(
          __dirname,
          'src',
          'demonstrate-routes',
          'settings-edit',
          'index.html',
        ),
        changePassword: resolve(
          __dirname,
          'src',
          'demonstrate-routes',
          'change-password-page',
          'index.html',
        ),
        errorNotFound: resolve(
          __dirname,
          'src',
          'demonstrate-routes',
          'error-404',
          'index.html',
        ),
        serverErrorPage: resolve(
          __dirname,
          'src',
          'demonstrate-routes',
          'error-500',
          'index.html',
        ),
        chatMessageList: resolve(
          __dirname,
          'src',
          'demonstrate-routes',
          'chat-message-list-page',
          'index.html',
        ),
      },
    },
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  plugins: [handlebars()],
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
});
