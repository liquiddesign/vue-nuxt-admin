import {type Ref, ref } from 'vue';
import type {Settings} from '~/plugins/authorization';

export const useTableVars = (settings: Settings): {
    filters: Ref<object>;
    lang: Ref<string>;
    currency: Ref<string>;
    currencies: Ref<string[]>;
    langs: Ref<string[]>;
} => {
    const filters = ref<object>({});
    const lang = ref<string>(settings.defaultLang);
    const currency = ref<string>(settings.defaultCurrency);
    const currencies = ref<string[]>(settings.currencies);
    const langs = ref<string[]>(settings.langs);
    const router = useRouter();
    const route = useRoute();

    watch(filters,  (newFilters) => {
        router.push({ query: {...newFilters} });
    }, { deep: true });

    onMounted(() => {
        filters.value = {...route.query};
    });


    onActivated(() => {
        router.push({ query: {...filters.value} });
    });
    return { filters, lang, currency, currencies, langs };
};