<template>
  <div class="mb-3 card" v-bind="$attrs">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>
    <div v-if="$slots.body || $slots.default" class="card-body">
      <slot name="body" />
      <slot />
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>