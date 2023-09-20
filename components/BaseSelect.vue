<template>
  <BaseWrapper :wrap="wrap">
    <input class="form-control-sm form-control" v-bind="$attrs" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
  </BaseWrapper>
</template>
<script setup lang="ts">
defineProps<{
  wrap?: string
  modelValue: string
}>();

defineEmits(['update:modelValue'])

</script>