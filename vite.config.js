import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "Yago Cerqueira Regis - Desenvolvedor Full Stack",
        short_name: "Yago Portfolio",
        description:
          "Portfólio profissional de Yago Cerqueira Regis - Desenvolvedor Full Stack",
        theme_color: "#667eea",
        background_color: "#0a0a0a",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg}"],
        globIgnores: [
          // Exclude large files from precaching to avoid PWA limits
          "**/lacos-site.png",
          "**/projeto-guto.svg", 
          "**/projeto-paulo.svg"
        ],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3MB limit for remaining files
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "google-fonts-stylesheets",
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
          // Add runtime caching for large assets
          {
            urlPattern: /\.(png|svg|jpg|jpeg)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1MB
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries into separate chunks
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'animation-vendor': ['framer-motion'],
          'swiper-vendor': ['swiper'],
          'icons-vendor': ['react-icons'],
          // Split large components into separate chunks
          'components': [
            './src/Components/Dashboard/Dashboard.jsx',
            './src/Components/Work-section/Work.jsx',
            './src/Components/Testimonials/Testimonials.jsx'
          ]
        },
      },
    },
  },
});
