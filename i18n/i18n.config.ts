import en from "./locales/en.json"
import cs from "./locales/cs.json"

export default defineI18nConfig(() => ({
    legacy: false,
    locales: ['cs', 'en'],
    locale: 'cs',
    fallbackLocale: 'en',
    messages: {
        cs, en
    }
}))