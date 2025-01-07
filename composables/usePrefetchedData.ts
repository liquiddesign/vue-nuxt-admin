import type {Reactive} from 'vue';

const currencies = reactive<any>({});
const administrators = reactive<any>({});

export const usePrefetchedData = (): {
    currencies: Reactive<any>;
    administrators: Reactive<any>;
} => {

    apiFetch('list', {method: 'GET'}).then((response: any) => {
        currencies.value = response?.result;
    });

    return { currencies, administrators };
};