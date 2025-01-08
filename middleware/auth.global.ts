import {AuthorizationLevel} from '~/composables/useUser';

const fallBackRoute: string  = 'dashboards';

export default defineNuxtRouteMiddleware(async (to) => {
    const { isLoggedIn, hasPermission, reload, settings } = useUser();
    const destination: string | undefined = to.name?.toString();

    if (!isLoggedIn.value && destination !== 'index') {
        await reload();
    }

    if (destination && isLoggedIn.value && (destination === 'index' || !hasPermission(destination)) && hasPermission(settings.value.homepage  ?? fallBackRoute)) {
        return navigateTo(settings.value.homepage ?? fallBackRoute);
    }

    if (!destination || to.meta.authorization === AuthorizationLevel.Public || (to.meta.authorization === AuthorizationLevel.Authenticated && isLoggedIn.value)) {
        return;
    }

    if (destination !== 'index' && !isLoggedIn.value) {
        return navigateTo({name: 'index', query: {redirectTo: to.path}});
    }

    if (destination !== 'index' && isLoggedIn.value && !hasPermission(destination)) {
        return abortNavigation();
    }
});