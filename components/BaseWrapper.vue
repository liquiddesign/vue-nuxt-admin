<template>
  <div v-if="wrap" :class="wrap">
    <slot />
  </div>
  <slot v-else />
</template>

<script setup lang="ts">

defineProps<{
  wrap?: string|object
}>();

</script>