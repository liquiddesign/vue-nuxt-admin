import VueToast from 'vue-toast-notification';

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(VueToast, {position: 'top'}).provide('toast', nuxtApp.vueApp.config.globalProperties.$toast);
});