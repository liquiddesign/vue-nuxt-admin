import {type Ref, ref } from 'vue';

export const useTableVars = (): {
    filters: Ref<object>;
    lang: Ref<string>;
    currency: Ref<string>;
    currencies: Ref<string[]>;
    langs: Ref<string[]>;
} => {
    const router = useRouter();
    const route = useRoute();

    console.log(route.query);

    const { settings } = useUser();
    const filters = ref<object>({...route.query});
    const lang = ref<string>(settings.value.defaultLang);
    const currency = ref<string>(settings.value.defaultCurrency);
    const currencies = ref<string[]>(settings.value.currencies);
    const langs = ref<string[]>(settings.value.langs);


    watch(filters,  (newFilters) => {
        router.push({ query: {...newFilters} });
    }, { deep: true });

    onActivated(() => {
        router.push({ query: {...filters.value} });
    });

    return { filters, lang, currency, currencies, langs };
};