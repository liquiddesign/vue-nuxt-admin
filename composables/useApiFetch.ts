import type {RuntimeConfig} from '@nuxt/schema';

export const useApiFetch = (request: string, opts: any = [], csrfProtection: boolean = true) => {
    const config: RuntimeConfig = useRuntimeConfig();
    let token: string = '';

    const { generateCsfrToken } = useUser();

    if (csrfProtection) {
       token = generateCsfrToken(request);
    }

    return useFetch(request, { baseURL: config.public.baseURL, ...opts, credentials: 'include', headers: {'Csrf-Token': token} });
};