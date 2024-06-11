export default defineNuxtRouteMiddleware((to) => {
    //const { $user } = useNuxtApp();
    console.log(to);
    /*if (to.path === '/') {
        return navigateTo('dashboards');
    }*/

    /*console.log($user.isLoggedIn);
    console.log(to.path);
    console.log($user.hasPermission(to.path));

    if (to.path !== '/' && !$user.isLoggedIn) {
       return navigateTo('/');
    }

    if (to.path === '/' && $user.isLoggedIn) {
        return navigateTo($user.homepage);
    }

    if (to.path !== '/' && !$user.hasPermission(to.path)) {
        return abortNavigation();
    }*/
});