import {type DataProvider} from '~/utils/DataProvider';

export default defineNuxtPlugin(() => {
    //const config = useRuntimeConfig();
    const currencies: object  = reactive({});

    const dataProvider: DataProvider = {
        currencies: currencies,
    };

    /*$fetch(config.public.baseURL + 'list', {method: 'GET'}).then((response: any) => {
        Object.assign(dataProvider.currency, response?.result);
    });*/

    return {
        provide: {
            currencies: dataProvider,
        },
    };
});