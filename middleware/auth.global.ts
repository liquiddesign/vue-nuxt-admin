import {AuthorizationLevel} from '~/plugins/authorization';

export default defineNuxtRouteMiddleware((to) => {
    const { $user } = useNuxtApp();
    const destination: string | undefined = to.name?.toString();

    if (!destination || to.meta.authorization === AuthorizationLevel.Public || (to.meta.authorization === AuthorizationLevel.Authenticated && $user.isLoggedIn)) {
        return;
    }

    if ($user.isLoggedIn && (destination === 'index' || !$user.hasPermission(destination))) {
        return navigateTo($user.homepage);
    }

    if (destination !== 'index' && !$user.isLoggedIn) {
        return navigateTo({name: 'index', query: {redirectTo: to.path}});
    }

    if (destination !== 'index' && $user.isLoggedIn && !$user.hasPermission(destination)) {
        return abortNavigation();
    }
});