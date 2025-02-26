<template>
  <div class="app-page-title">
    <div class="page-title-wrapper">
      <div class="page-title-heading">
        <div class="page-title-icon w-auto">
          <BaseIcon :icon-name="icon" :size="24" />
        </div>
        <div>
          {{ title }} <div class="user-avatar bg-secondary ms-1" style="display: inline-flex; height: 20px; width: 20px; position: relative; top: -2px;">
            <span class="initials"><BaseIcon icon-name="LockKeyhole" :size="14" :stroke-width="2" /></span>
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