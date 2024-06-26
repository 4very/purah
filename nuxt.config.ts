// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/strapi', '@nuxt/image'],
  runtimeConfig: {
    strapi: {
      url: 'http://localhost:1337',
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
})
