import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-schema-org',
    '@nuxt/content',
  ],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  site: {
    url: 'https://business-toolkit.app',
    name: 'Business Toolkit',
  },

  // Every public page is pre-rendered static HTML (README: Technical SEO).
  // `nuxt generate` crawls links from these and prerenders the 10 calculator
  // pages automatically. /snapshot is the only private, noindex route.
  routeRules: {
    '/': { prerender: true },
    '/calculators': { prerender: true },
    '/about': { prerender: true },
    '/contact': { prerender: true },
    '/privacy': { prerender: true },
    '/terms': { prerender: true },
    '/snapshot': { prerender: false, index: false, robots: 'noindex, nofollow' },
  },

  sitemap: {
    exclude: ['/snapshot'],
  },

  robots: {
    disallow: ['/snapshot'],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
    },
  },
})
