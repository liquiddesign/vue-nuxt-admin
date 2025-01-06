import {AuthorizationLevel, type Identity} from '~/plugins/authorization';

type AuthStatusResponse = {
    result: {
        isLoggedIn: boolean;
        identity: Identity;
        csrfToken: string;
    };
};

export default defineNuxtRouteMiddleware(async (to) => {
    const { $user } = useNuxtApp();
    const destination: string | undefined = to.name?.toString();

    if (!$user.isLoggedIn) {
        const { data } = await useFetch<AuthStatusResponse>('http://localhost/vue-nuxt-api/api/auth/status', {credentials: 'include'});
        if (data.value && data.value.result && data.value.result.isLoggedIn) {
            console.log(data.value.result.identity);
            $user.login(data.value.result.identity, true, data.value.result.csrfToken);
        }
    }

    if (destination && $user.isLoggedIn && (destination === 'index' || !$user.hasPermission(destination)) && $user.hasPermission($user.homepage)) {
        return navigateTo($user.homepage);
    }

    if (!destination || to.meta.authorization === AuthorizationLevel.Public || (to.meta.authorization === AuthorizationLevel.Authenticated && $user.isLoggedIn)) {
        return;
    }

    if (destination !== 'index' && !$user.isLoggedIn) {
        return navigateTo({name: 'index', query: {redirectTo: to.path}});
    }

    if (destination !== 'index' && $user.isLoggedIn && !$user.hasPermission(destination)) {
        return abortNavigation();
    }
});