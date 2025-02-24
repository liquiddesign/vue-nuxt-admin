<template>
  <BaseButton class="btn btn-outline-2x btn-sm" :class="{'active' : showFilters}">
    <Filter :size="size" :stroke-width="strokeWidth" />
  </BaseButton>
</template>

<script setup lang="ts">
import { Filter } from 'lucide-vue-next';

defineProps({
  showFilters: {
    type: Boolean,
    default: false,
  },
  size: {
    type: Number,
    default: 13,
  },
  strokeWidth: {
    type: Number,
    default: 1.75,
  },
});
</script>