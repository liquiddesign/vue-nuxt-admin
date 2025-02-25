<template>
  <component :is="iconComponent" :size="size" :stroke-width="strokeWidth" />
</template>

<script setup>
const props = defineProps({
      iconName: { type: String, default: null },
      size: { type: Number, default: 16 },
      strokeWidth: { type: Number, default: 1.5 },
    });


import { defineAsyncComponent } from 'vue';


const iconComponent = defineAsyncComponent(() =>
    import('lucide-vue-next').then((module) => module[`Lucide${props.iconName}`])
);

</script>

