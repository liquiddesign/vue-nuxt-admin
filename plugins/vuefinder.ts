import { defineNuxtPlugin } from '#app';
import VueFinder from 'vuefinder/dist/vuefinder';
import 'vuefinder/dist/style.css';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueFinder);
});