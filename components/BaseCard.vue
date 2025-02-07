<template>
  <BaseWrapper :wrap="wrap">
    <div class="mb-3 card" v-bind="$attrs">
      <div v-if="$slots.headerLeft || $slots.headerRight || $slots.header" class="card-header h-auto py-3">
        <slot name="header">
          <div class="btn-actions-pane-left">
            <slot name="headerLeft" />
          </div>
          <div class="btn-actions-pane-right">
            <slot name="headerRight" />
          </div>
        </slot>
      </div>
      <div v-if="$slots.body || $slots.default" class="card-body">
        <slot name="body" />
        <slot />
      </div>
      <div v-if="$slots.footer" class="card-footer">
        <slot name="footer" />
      </div>
    </div>
  </BaseWrapper>
</template>
<script setup lang="ts">
defineProps<{
  wrap?: string,
}>();
</script>