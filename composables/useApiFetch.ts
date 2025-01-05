export const useApiFetch = (request: any, opts: any = []) => {
    const config = useRuntimeConfig();

    return useFetch(request, { baseURL: config.public.baseURL, ...opts, credentials: 'include', headers: {'Csrf-Token': 'token'} });
};