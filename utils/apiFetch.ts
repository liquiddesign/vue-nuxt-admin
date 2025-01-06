import { generateCsfrToken } from '~/utils/generateCsfrToken';
import type {NitroFetchOptions} from 'nitropack';

export const apiFetch = async <T>(
    url: string,
    options: Partial<NitroFetchOptions<any>> & {
        params?: Record<string, any>;
        body?: any;
    } = {},
    csrfProtection: boolean = true
): Promise<T> => {
    const config = useRuntimeConfig();
    //const { accessToken } = useUser();
    const { $user } = useNuxtApp();
    let token: string = '';

    if (csrfProtection && $user.token) {
        token = generateCsfrToken($user.token, url);
    }

    return $fetch<T>(config.public.baseURL + url, {
        ...options,
        headers: {
            ...options.headers,
            'Csrf-Token': token,
        },
        credentials: 'include',
    });
};
