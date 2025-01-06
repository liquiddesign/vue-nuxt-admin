import {generateCsfrToken} from '~/utils/generateCsfrToken';
import type {RuntimeConfig} from '@nuxt/schema';

export const useApiLazyFetch = (request: string, opts: any = [], csrfProtection: boolean = true) => {
    const config: RuntimeConfig = useRuntimeConfig();
    let token: string = '';
    const { accessToken } = useUser();

    if (csrfProtection && accessToken.value) {
        token = generateCsfrToken(accessToken.value, request);
    }

    return useLazyFetch(request, { baseURL: config.public.baseURL, ...opts, credentials: 'include', headers: {'Csrf-Token': token} });
};