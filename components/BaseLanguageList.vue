<template>
  <a v-for="key in langs" :key="key" class="btn btn-sm btn-outline-dark ms-1" :class="{'bg-primary': key === lang}" @click.prevent="emit('select', key)"><BaseFlag :lang="key" /></a>
</template>
<script setup lang="ts">
withDefaults(defineProps<{
  lang: string,
  langs: string[],
}>(), {});

import {withDefaults} from "vue";

defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits(['select']);
</script>