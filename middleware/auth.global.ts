export default defineNuxtRouteMiddleware((to) => {
    const { $user } = useNuxtApp();
    const destination: string | undefined = to.name?.toString();

    if (!destination) {
        return;
    }

    if ((destination === 'index' || !$user.hasPermission(destination)) && $user.isLoggedIn) {
        return navigateTo($user.homepage);
    }

    if (destination !== 'index' && !$user.isLoggedIn) {
        return navigateTo({name: 'index', query: {redirectTo: to.path}});
    }

    if (destination !== 'index' && $user.isLoggedIn && !$user.hasPermission(destination)) {
        return abortNavigation();
    }
});