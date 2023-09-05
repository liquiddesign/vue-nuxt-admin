import {User} from "~/utils/User";
import {DataProvider} from "~/utils/DataProvider";

export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig();

    const currencies: object  = reactive({});

    const dataProvider: DataProvider = {
        currencies: currencies,
    };



    $fetch(config.public.baseURL + 'list', {method: "GET"}).then((response) => {

        Object.assign(dataProvider.currencies, response?.result);
    });

    return {
        provide: {
            currencies: dataProvider,
        },
    }
})