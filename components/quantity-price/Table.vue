<template>
123
</template>

<script setup lang="ts">
import type {GridOrder} from '~/composables/useTableVars';

withDefaults(defineProps<{
  filters?: any,
  page: number,
  onPage: number,
  order: GridOrder,
}>(), { filters: {} });

const url: string = 'eshop/quantity-price';
const emit = defineEmits(['update:page', 'update:onPage', 'update:order']);
</script>