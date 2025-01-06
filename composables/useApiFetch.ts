import {generateCsfrToken} from '~/utils/generateCsfrToken';
import type {RuntimeConfig} from '@nuxt/schema';

export const useApiFetch = (request: string, opts: any = [], csrfProtection: boolean = true) => {
    const config: RuntimeConfig = useRuntimeConfig();
    let token: string = '';
    //const { accessToken } = useUser();
    const { $user } = useNuxtApp();

    if (csrfProtection && $user.token) {
       token = generateCsfrToken($user.token, request);
    }

    return useFetch(request, { baseURL: config.public.baseURL, ...opts, credentials: 'include', headers: {'Csrf-Token': token} });
};