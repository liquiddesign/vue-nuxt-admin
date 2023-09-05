<template>
  <BaseWrapper :wrap="wrap">
    <label class="form-check-label">
        <input class="form-check-input" type="checkbox" v-bind="$attrs" :checked="modelValue" @input="$emit('update:modelValue', $event.target.checked)" /> {{ label }}
    </label>
  </BaseWrapper>
</template>
<script setup lang="ts">
  import {withDefaults} from "vue";

  defineOptions({
    inheritAttrs: false
  });

  const props = withDefaults(defineProps<{
    label?: string|null,
    wrap?: string
    modelValue: String
  }>(), { label: null });
</script>