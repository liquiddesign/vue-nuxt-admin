import type {RuntimeConfig} from '@nuxt/schema';

export const useApiFetch = (request: string, opts: any = [], csrfProtection: boolean = true) => {
    const config: RuntimeConfig = useRuntimeConfig();
    let token: string = '';

    const { generateCsfrToken, settings } = useUser();

    if (csrfProtection) {
       token = generateCsfrToken(request);
    }

    const headers = computed(() => ({
        'Database': settings.value.database,
        'Csrf-Token': token,
    }));

    return useFetch(request, { baseURL: config.public.baseURL, ...opts, credentials: 'include', headers });
};