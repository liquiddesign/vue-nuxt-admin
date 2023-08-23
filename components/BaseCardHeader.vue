<template>
  <div class="app-page-title">
    <div class="page-title-wrapper">
      <div class="page-title-heading">
        <div class="page-title-icon">
          <i class="icon-gradient bg-ripe-malin" :class="icon"></i>
        </div>
        <div>
          {{ title }}
          <div v-if="description" class="page-title-subheading">{{ description }}</div>
        </div>
      </div>
      <div class="page-title-actions">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  title: string
  description?: string
  icon: string
}>();

</script>