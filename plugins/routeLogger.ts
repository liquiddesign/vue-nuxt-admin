

export default defineNuxtPlugin((nuxtApp) => {
    const route = useRoute();

    nuxtApp.hook('page:finish', (context) => {
        console.log('Stránka byla načtena:', context, route.name, route.path);
        const { sendVisit } = useLiveFeed();

        /*const msg = {
            action: 'test',
            route: route?.name,
            recordId: route?.params?.id,
            user: null,
        };*/

        sendVisit();
    });
});