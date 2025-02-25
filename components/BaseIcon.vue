<template>
  <component :is="iconComponent" :size="size" :stroke-width="strokeWidth" :color="color" />
</template>

<script setup>
const props = defineProps({
      iconName: { type: String, default: null },
      size: { type: Number, default: 24 },
      strokeWidth: { type: Number, default: 1 },
      color: { type: String, default: '' },
    });


import { defineAsyncComponent } from 'vue';


const iconComponent = defineAsyncComponent(() =>
    import('lucide-vue-next').then((module) => module[`Lucide${props.iconName}`])
);

</script>

