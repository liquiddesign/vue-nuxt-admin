<template>
  <div class="app-page-title">
    <div class="page-title-wrapper">
      <div class="page-title-heading">
        <div class="page-title-icon">
          <i class="icon-gradient bg-ripe-malin" :class="icon" />
        </div>
        <div>
          {{ title }} <div class="user-avatar bg-secondary ms-1" style="display: inline-flex; height: 20px; width: 20px; position: relative; top: -2px;">
            <span class="initials"><i class="fa fa-lock" style="font-size: 13px; top:1px; position: relative;" /></span>
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