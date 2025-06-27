// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', 'leaflet/dist/leaflet.css'],
  vite: {
    plugins: [tailwindcss()],
  },

  modules: [
    '@nuxt/devtools',
    '@pinia/nuxt',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@nuxt/eslint',
  ],

  runtimeConfig: {
    public: { hubspotId: process.env.HUBSPOT_ID },
  },

  ssr: true,

  app: {
    head: {
      title: 'Faces of Odense: A Global Community in 43 Portraits',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
})
