// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxt-lodash', 'nuxt-lucide-icons'],

  typescript: {
      strict: true,
  },

  ssr: false,
  css: ['bootstrap/dist/css/bootstrap.min.css', '@/assets/css/base.css', '@/assets/css/adds.css', '@/assets/css/toaster.css', '@/assets/css/popper.css', '@/assets/css/multiselect.css'],

  app: {
      head: {
          charset: 'utf-8',
          title: 'Roiwell B2B - Administrace',
          meta: [
              { name: 'description', content: 'My amazing site.' },
          ],
      },
  },

  lucide: {
    namePrefix: 'Icon',
  },

  runtimeConfig: {
      public: {
          baseURL: process.env.NUXT_BASE_URL,
          wsURL: process.env.NUXT_WS_URL,
          userFilesURL: process.env.NUXT_USERFILES_URL,
          cloudManager: process.env.NUXT_CLOUDMANAGER,
          googleApiKey: process.env.GOOGLE_API_KEY,
      },
  },

  lodash: {
      prefix: '_',
      upperAfterPrefix: false,
  },

  compatibilityDate: '2024-12-26',
});