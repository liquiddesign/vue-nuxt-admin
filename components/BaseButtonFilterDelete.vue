<template>
  <BaseButton class="btn btn-outline-2x btn-sm">
    <FilterX :size="size" :stroke-width="strokeWidth" />
  </BaseButton>
</template>

<script setup lang="ts">
import { FilterX } from 'lucide-vue-next';

defineProps({
  size: {
    type: Number,
    default: 16,
  },
  strokeWidth: {
    type: Number,
    default: 1.75,
  },
});
</script>