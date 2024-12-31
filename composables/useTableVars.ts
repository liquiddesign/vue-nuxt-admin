import {type Ref, ref } from 'vue';

interface Settings {
    defaultOnPage: number;
    defaultLang: string;
    defaultCurrency: string;
    currencies: string[];
    langs: string[];
}

export const useTableVars = (settings: Settings): {
    filters: Ref<object>;
    page: Ref<number>;
    onPage: Ref<number>;
    lang: Ref<string>;
    currency: Ref<string>;
    currencies: Ref<string[]>;
    langs: Ref<string[]>;
} => {
    const filters = ref<object>({});
    const page = ref<number>(1);
    const onPage = ref<number>(settings.defaultOnPage);
    const lang = ref<string>(settings.defaultLang);
    const currency = ref<string>(settings.defaultCurrency);
    const currencies = ref<string[]>(settings.currencies);
    const langs = ref<string[]>(settings.langs);

    return { filters, page, onPage, lang, currency, currencies, langs };
};