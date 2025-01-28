<template>
  <BaseFilter @cancel="emit('update:modelValue', {})">
    <BaseTextBox v-model="modelValue['f-name%']" wrap="flex-shrink-0" placeholder="Popisek" type="text" />
    <BaseTextBox v-model="modelValue['f-type%']" wrap="flex-shrink-0" placeholder="Typ" type="text" />
  </BaseFilter>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue?: any | null,
}>(), { modelValue: undefined });

const emit = defineEmits(['update:modelValue']);
</script>