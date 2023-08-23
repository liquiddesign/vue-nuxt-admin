// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/apollo', "nuxt-lodash"],
    typescript: {
        strict: true
    },
    ssr: false,
    css: ["bootstrap/dist/css/bootstrap.min.css", "@/assets/css/base.css", "@/assets/css/adds.css", "@/assets/css/toaster.css", "@/assets/css/multiselect.css", "pe7-icon/dist/dist/pe-icon-7-stroke.css", "font-awesome/css/font-awesome.css"],
    app: {
        head: {
            charset: 'utf-8',
            title: 'Roiwell B2B - Administrace',
            meta: [
                { name: 'description', content: 'My amazing site.' }
            ],
        }
    },
    runtimeConfig: {
        public: {
            baseURL: process.env.NUXT_BASE_URL,
        },
    },
    apollo: {
        clients: {
            default: {
                httpEndpoint: 'http://www.roiwell-api.cz.d4169.masterinter.net/',
                httpLinkOptions: {
                    credentials: 'include'
                }
            },
        },
    },
    lodash: {
        prefix: "_",
        upperAfterPrefix: false,
    }
})
