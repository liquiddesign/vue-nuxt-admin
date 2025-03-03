<template>
  <div class="app-page-title">
    <div class="page-title-wrapper">
      <div class="page-title-heading">
        <div class="page-title-icon w-auto">
          <BaseIcon :icon-name="icon" :size="24" />
        </div>
        <div>
          {{ title }}
          <div class="user-avatar bg-secondary" style="display: inline-flex; width: 20px; position: relative;">
            <BaseIcon icon-name="LockKeyhole" :size="11" :stroke-width="2" />
          </div>
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