import en from '../locales/en.json';
import cs from '../locales/cs.json';
import { createI18n } from 'vue-i18n';

export default defineNuxtPlugin(({ vueApp }) => {
    const i18n = createI18n({
        legacy: false,
        globalInjection: true,
        locales: ['cs', 'en'],
        locale: 'cs',
        fallbackLocale: 'en',
        messages: {
            cs, en,
        },
    });

    vueApp.use(i18n);
});


