<template>
  <BaseFilter @cancel="emit('update:modelValue', {})">
    <BaseTextBox v-model="modelValue['f-code%']" wrap="flex-shrink-0" placeholder="Kód" type="text" style="width: 60px;" />
    <BaseTextBox v-model="modelValue['f-name%']" wrap="flex-shrink-0" placeholder="Název" type="text" />
  </BaseFilter>
</template>


<script setup lang="ts">
withDefaults(defineProps<{
  modelValue?: any | null,
}>(), { modelValue: undefined });

const emit = defineEmits(['update:modelValue']);
</script>