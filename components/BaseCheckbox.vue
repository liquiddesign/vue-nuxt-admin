<template>
  <BaseWrapper :wrap="wrap">
    <label class="form-check-label">
      <input class="form-check-input" type="checkbox" v-bind="$attrs" :checked="modelValue" @input="$emit('update:modelValue', $event.target.checked)"> {{ label }}
    </label>
  </BaseWrapper>
</template>
<script setup lang="ts">
  import {withDefaults} from "vue";

  defineOptions({
    inheritAttrs: false
  });

  withDefaults(defineProps<{
    label?: string|null,
    wrap?: string
    modelValue: string
  }>(), { label: null, wrap: undefined, });

  defineEmits(['update:modelValue']);
</script>