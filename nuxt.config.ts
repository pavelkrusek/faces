// https://nuxt.com/docs/api/configuration/nuxt-config

import peopleData from './data/people.json'
import slugify from 'slugify'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css', 'leaflet/dist/leaflet.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/devtools',
    '@pinia/nuxt',
    '@nuxt/scripts',
    '@nuxt/eslint',
    '@stefanobartoletti/nuxt-social-share',
  ],

  socialShare: {
    baseUrl: 'https://odensefaces.dagmarstudio.dk',
  },

  runtimeConfig: {
    public: { hubspotId: process.env.HUBSPOT_ID },
  },

  ssr: true,

  routeRules: {
    '/': { prerender: true },
    '/personer/**': { prerender: true },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: peopleData.map((p) => {
        const slug = `${p.id}-${slugify(p.name, { lower: true, strict: true })}`
        return `/personer/${slug}`
      }),
    },
  },

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
