import type {Reactive} from 'vue';

const currencies = reactive<any>({});
const administrators = reactive<any>({});

async function reload(): Promise<void> {
    try {
        const response: any = await apiFetch('list', { method: 'GET' });

        Object.keys(currencies).forEach(key => delete currencies[key]);
        Object.keys(administrators).forEach(key => delete administrators[key]);

        Object.assign(currencies, response.result.currencies);
        Object.assign(administrators, response.result.administrators);
    } catch (error) {
        console.error('Error during load:', error);
    }
}

// Inicialní načtení dat
reload();

export const usePrefetchedData = (): {
    currencies: Reactive<any>;
    administrators: Reactive<any>;
    reload: () => Promise<void>;
} => {
    return { currencies, administrators, reload };
};