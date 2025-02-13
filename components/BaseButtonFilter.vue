<template>
  <BaseButton class="btn btn-outline-2x btn-sm" :class="{'active' : showFilters}">
    <i class="fa fa-filter" />
  </BaseButton>
</template>

<script setup lang="ts">
defineProps({
  showFilters: {
    type: Boolean,
    default: false,
  },
});
</script>