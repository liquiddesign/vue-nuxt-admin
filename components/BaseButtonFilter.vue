<template>
  <BaseButton class="btn btn-outline-primary btn-sm" :class="{'active' : showFilters}">
    <BaseIcon icon-name="ListFilter" :stroke-width="1" :size="15" />
  </BaseButton>
</template>

<script setup lang="ts">
defineProps({
  showFilters: { type: Boolean, default: false },
});
</script>