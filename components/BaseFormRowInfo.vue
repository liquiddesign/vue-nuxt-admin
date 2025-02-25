<template>
  <BaseWrapper :wrap="wrap + ' d-flex'">
    <BaseIcon icon-name="Info" :size="size" class="flex-shrink-0 pe-1" />
    <slot />
  </BaseWrapper>
</template>

<script setup lang="ts">
defineProps({
  wrap: { type: String, default: '' },
  size: { type: Number, default: 20 },
});
</script>