// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",

  css: ["../assets/css/main.css"],

  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],

  runtimeConfig: {
    apiKey: process.env.NUXT_API_KEY,
    authDomain: process.env.NUXT_AUTH_DOMAIN,
    projectId: process.env.NUXT_PROJECT_ID,
    storageBucket: process.env.NUXT_STORAGE_BUCKET,
    messagingSenderId: process.env.NUXT_MESSAGING_SENDER_ID,
    appId: process.env.NUXT_APP_ID,
    measurementId: process.env.NUXT_MEASUREMENT_ID,
    public: {
      apiKey: process.env.NUXT_API_KEY,
      authDomain: process.env.NUXT_AUTH_DOMAIN,
      projectId: process.env.NUXT_PROJECT_ID,
      storageBucket: process.env.NUXT_STORAGE_BUCKET,
      messagingSenderId: process.env.NUXT_MESSAGING_SENDER_ID,
      appId: process.env.NUXT_APP_ID,
      measurementId: process.env.NUXT_MEASUREMENT_ID,
    },
  },
});
