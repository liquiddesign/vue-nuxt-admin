export const apiFetch = async <T>(
    url: string,
    options: {
        body?: any;
        params?: Record<string, any>;
        method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
        credentials?: RequestCredentials;
    } = {}
): Promise<T> => {
    const config = useRuntimeConfig();

    return $fetch<T>( config.public.baseURL + url, {
        credentials: 'include',
        headers: {'Csrf-Token': 'token'},
        ...options,
    });
};