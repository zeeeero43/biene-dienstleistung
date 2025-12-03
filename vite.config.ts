import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), tailwindcss()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // PageSpeed Optimierungen - esbuild ist schneller als terser
        minify: 'esbuild',
        esbuild: {
          drop: ['console', 'debugger'], // Remove console.logs in production
        },
        rollupOptions: {
          output: {
            // Code Splitting für bessere Ladezeiten
            manualChunks: {
              'react-vendor': ['react', 'react-dom', 'react-router-dom'],
              'animation-vendor': ['framer-motion'],
              'icons-vendor': ['lucide-react'],
            },
          },
        },
        // Chunk Size Warnings
        chunkSizeWarningLimit: 1000,
        cssCodeSplit: true,
        sourcemap: false, // Keine Source Maps in Production für kleinere Dateien
        assetsInlineLimit: 4096, // Inline kleine Assets als Base64
      },
      // CSS Optimierungen
      css: {
        devSourcemap: false,
      },
    };
});
