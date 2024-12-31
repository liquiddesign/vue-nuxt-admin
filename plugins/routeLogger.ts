export default defineNuxtPlugin((nuxtApp) => {
    const route = useRoute();

    nuxtApp.hook('page:finish', () => {
        if (route.name !== 'index') {
            const {sendVisit} = useLiveFeed();

            sendVisit();
        }
    });
});