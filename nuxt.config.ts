// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', "@nuxtjs/sanity"],

  sanity: {
    projectId: "r5jxh35w",
    dataset: "production",
  },

  runtimeConfig: {
    superSecretToken: '',
    public: {
      apiTrackingBaseUrl: ''
    }
      },
    

css: ['@/assets/scss/main.scss'],

components: [
  { path: '~/components', pathPrefix: false },
],

vite: {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/scss/foundations/variables" as *;
          @use "@/assets/scss/foundations/functions" as *;
          @use "@/assets/scss/foundations/mixins" as *;
          @use "@/assets/scss/foundations/normalize" as *;
        `,
      },
    },
  },
}

})