<template>
  <component :is="iconComponent" />
</template>

<script setup>
const props = defineProps({
  iconName: String,
});

import { defineAsyncComponent } from 'vue';


const iconComponent = defineAsyncComponent(() =>
    import('lucide-vue-next').then((module) => module[`Lucide${props.iconName}`])
);

</script>

