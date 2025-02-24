// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxt-lodash', 'nuxt-lucide-icons'],

  typescript: {
      strict: true,
  },

  ssr: false,
  css: ['bootstrap/dist/css/bootstrap.min.css', '@/assets/css/base.css', '@/assets/css/adds.css', '@/assets/css/toaster.css', '@/assets/css/popper.css', '@/assets/css/multiselect.css', 'pe7-icon/dist/dist/pe-icon-7-stroke.css', '@fortawesome/fontawesome-free/css/all.min.css'],

  app: {
      head: {
          charset: 'utf-8',
          title: 'Roiwell B2B - Administrace',
          meta: [
              { name: 'description', content: 'My amazing site.' },
          ],
      },
  },

  runtimeConfig: {
      public: {
          baseURL: process.env.NUXT_BASE_URL,
          wsURL: process.env.NUXT_WS_URL,
          userFilesURL: process.env.NUXT_USERFILES_URL,
      },
  },

  lodash: {
      prefix: '_',
      upperAfterPrefix: false,
  },

  compatibilityDate: '2024-12-26',
});