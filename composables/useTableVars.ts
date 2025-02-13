import {type Ref, ref } from 'vue';
import type {LocationQueryValue} from 'vue-router';
import {clearObject} from '~/utils/helpers';

export interface GridOrder {
    property?: string
    direction?: 'asc' | 'desc',
}

export const useTableVars = (): {
    filters: Ref<object>;
    clearFilters: () => void;
    showFilters: Ref<boolean>;
    lang: Ref<string>;
    currency: Ref<string>;
    currencies: Ref<string[]>;
    langs: Ref<string[]>;
    page: Ref<number>;
    onPage: Ref<number>;
    order: Ref<GridOrder>;
} => {
    const router = useRouter();
    const route = useRoute();

    const { order: queryOrder, page: queryPage, onPage: queryOnPage, ...filterQuery } = route.query;

    const { settings } = useUser();
    const filters = ref<Record<string, LocationQueryValue | LocationQueryValue[]>>(filterQuery);
    const showFilters = ref(false);
    const lang = ref<string>(settings.value.defaultLang);
    const currency = ref<string>(settings.value.defaultCurrency);
    const currencies = ref<string[]>(settings.value.currencies);
    const langs = ref<string[]>(settings.value.langs);
    const page = ref<number>(queryPage ? parseInt(queryPage.toString()) : 1);
    const onPage = ref<number>(queryOnPage ? parseInt(queryOnPage.toString()) : settings.value.defaultOnPage);

    let auxOrder = {};
    if (queryOrder) {
       const [property, direction] = queryOrder.toString().split('-');
       auxOrder = {property, direction: direction.toLowerCase() as 'asc' | 'desc' };
    }

    const order = ref<GridOrder>(auxOrder);


    watch(filters,  (newFilters) => {
        const { order} = route.query;

        const cleanedFilters = Object.fromEntries(
            Object.entries(newFilters).filter(([, value]) => value !== '')
        );

        router.push({ query: { order,  ...cleanedFilters} });
        page.value = 1;
    }, { deep: true });

    watch(order,  (order: GridOrder) => {
        if (!order.property) {
            router.push({query: {...route.query, order: undefined}});
        } else {
            router.push({query: {...route.query, order: order.property + '-' + order.direction}});
        }
    }, { deep: true });

    watch(page,  (page) => {
        console.log('pushhing', page);
        if (page > 1) {
            router.push({query: {...route.query, page: page}});
        } else {
            router.push({query: {...route.query, page: undefined}});
        }
    });

    const clearFilters = function () {
        clearObject(filters.value);
    };

    return { filters, clearFilters, showFilters, lang, currency, currencies, langs, page, onPage, order };
};