// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],

css: ['@/assets/scss/main.scss'],

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