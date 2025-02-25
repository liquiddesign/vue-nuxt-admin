<template>
  <BaseWrapper :wrap="wrap">
    <div class="mbg-3 alert alert-dismissible fade show" :class="'alert-' + type" role="alert">
      <span v-if="icon"><BaseIcon :icon-name="icon" :size="14" /></span>
      <slot />
    </div>
  </BaseWrapper>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  wrap?: string
  type: string
  icon?: string
}>(), { wrap: undefined, icon: undefined });

</script>