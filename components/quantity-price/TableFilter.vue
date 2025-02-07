<template>
  <BaseFilter @clear="emit('clear')">
    <BaseTextBox v-model="modelValue['f-name+code%']" wrap="flex-shrink-0" placeholder="Název, kód" type="text" />
  </BaseFilter>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue?: any | null,
}>(), { modelValue: undefined });

const emit = defineEmits(['update:modelValue', 'clear']);
</script>