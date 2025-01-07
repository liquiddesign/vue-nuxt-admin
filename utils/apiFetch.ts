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
    const { generateCsfrToken } = useUser();
    let token: string = '';

    if (csrfProtection) {
        token = generateCsfrToken(url);
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
