<template>
  <label class="form-check-label">
      <input class="form-check-input" type="checkbox" v-bind="$attrs" @input="$emit('update:modelValue', $event.target.checked)" /> {{ label }}
  </label>
</template>
<script setup lang="ts">
  import {withDefaults} from "vue";

  defineOptions({
    inheritAttrs: false
  });

  const props = withDefaults(defineProps<{
    label?: string|null,
  }>(), { label: null });
</script>