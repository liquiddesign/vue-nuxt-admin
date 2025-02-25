<template>
  <BaseButton class="btn btn-outline-primary btn-sm" :class="{'active' : showFilters}">
    <BaseIcon icon-name="Filter" :stroke-width="1.75" />
  </BaseButton>
</template>

<script setup lang="ts">
defineProps({
  showFilters: { type: Boolean, default: false },
});
</script>