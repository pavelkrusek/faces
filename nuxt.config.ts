// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', 'leaflet/dist/leaflet.css'],
  plugins: ['~/plugins/imageMap.js'],
  vite: {
    plugins: [tailwindcss()],
  },

  modules: [
    'nuxt-easy-lightbox',
    '@pinia/nuxt',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@nuxt/eslint',
  ],
  
  ssr: false,

  app: {
    head: {
      title: 'Faces – World Portrait Map',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
})
