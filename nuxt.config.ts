// https://nuxt.com/docs/api/configuration/nuxt-config

const strapiURL = 'http://192.168.0.102:1337'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/strapi', '@nuxt/image', '@nuxt/test-utils/module'],
  devServer: {
    port: 3000,
  },
  runtimeConfig: {
    strapi: {
      url: strapiURL,
    },
  },
  // css: ['./assets/index.scss'],
  postcss: {
    plugins: { 'postcss-simple-vars': {} },
  },
  image: {
    strapi: { baseURL: strapiURL },
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
