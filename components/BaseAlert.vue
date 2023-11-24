<template>
  <BaseWrapper :wrap="wrap">
    <div class="mbg-3 alert alert-dismissible fade show" :class="'alert-' + type" role="alert">
      <span v-if="icon" class="pr-2"><i :class="'fa ' + icon" /></span>
      <slot />
    </div>
  </BaseWrapper>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  wrap?: string
  type: string
  icon?: string
}>(), { wrap: undefined, icon: undefined });

</script>