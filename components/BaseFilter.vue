<template>
  <div class="d-flex align-items-center flex-wrap gap-1 grid-filter">
    <slot />
    <BaseButtonCancel wrap="flex-shrink-0" class="btn-sm" @click="emit('clear');" />
  </div>
</template>

<script setup lang="ts">
  const emit = defineEmits(['clear']);

</script>