<template>
  <BaseFilter @clear="emit('clear')">
    <slot />
    <BaseTextBox v-model="modelValue['f-label%']" wrap="flex-shrink-0" placeholder="Popisek" type="text" />
  </BaseFilter>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
  modelValue?: any | null,
}>(), { modelValue: undefined });

const emit = defineEmits(['update:modelValue', 'clear']);

</script>
