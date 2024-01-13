export const useTableVars = (settings: any) => {
    const filters: any = ref({});
    const page = ref(1);
    const onPage = ref(settings.defaultOnPage);
    const lang = ref(settings.defaultLang);
    const currency = ref(settings.defaultCurrency);
    const currencies = ref(settings.currencies);
    const langs = ref(settings.langs);

    return {filters, page, onPage, lang, currency, currencies, langs,};
};