<template>
  <BaseButton class="btn btn-outline-2x btn-sm" :class="{'active' : showFilters}">
    <i class="fa fa-filter" />
  </BaseButton>
</template>

<script setup lang="ts">
// const filterType: Ref<string> = '';
// const filterTypes = {
//   starts: 'Začíná s',
//   contains: 'Obsahuje',
//   notContains: 'Neobsahuje',
//   ends: 'Končí s',
//   equals: 'Rovná se',
//   notEquals: 'Nerovná se',
// };
defineProps({
  showFilters: {
    type: Boolean,
    default: false,
  },
});
</script>