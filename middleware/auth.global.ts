export default defineNuxtRouteMiddleware((to) => {
    const { $user } = useNuxtApp();

    if (to.path !== '/' && !$user.isLoggedIn) {
       return navigateTo('/');
    }

    if (to.path === '/' && $user.isLoggedIn) {
        return navigateTo($user.homepage);
    }

    if (to.path !== '/' && !$user.hasPermission(to.path)) {
        return abortNavigation();
    }
})