// https://nuxt.com/docs/api/configuration/nuxt-config

const strapiURL = 'http://localhost:1337'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/strapi', '@nuxt/image', '@nuxt/test-utils/module'],

  devServer: {
    port: 3000,
  },
  strapi: {
    version: 'v5',
  },

  runtimeConfig: {
    strapi: {
      url: strapiURL,
      version: 'v5',
    },
  },

  // css: ['./assets/index.scss'],
  postcss: {
    plugins: { 'postcss-simple-vars': {} },
  },

  // vite: {
  //   css: {
  //     preprocessorOptions: {
  //       scss: {
  //         additionalData: '@use "~/assets/_colors.scss" as *;',
  //       },
  //     },
  //   },
  // },
  image: {
    strapi: { baseURL: strapiURL },
  },

  compatibilityDate: '2024-09-25',
})
