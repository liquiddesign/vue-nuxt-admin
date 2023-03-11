// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/apollo'],
    typescript: {
        strict: true
    },
    css: ["bootstrap/dist/css/bootstrap.min.css", "@/assets/css/base.css", "@/assets/css/adds.css"],
    app: {
        head: {
            charset: 'utf-8',
            title: 'My App',
            meta: [
                { name: 'description', content: 'My amazing site.' }
            ],
        }
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
})
