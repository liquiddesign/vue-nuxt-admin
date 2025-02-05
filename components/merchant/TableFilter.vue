<template>
  <BaseFilter @clear="emit('clear')">
    <BaseTextBox v-model="modelValue['f-fullname%']" wrap="flex-shrink-0" placeholder="Jméno" type="text" />
    <BaseTextBox v-model="modelValue['f-email%']" wrap="flex-shrink-0" placeholder="E-mail" type="text" />
    <BaseTextBox v-model="modelValue['f-code%']" wrap="flex-shrink-0" placeholder="Kód" type="text" style="width: 60px;" />
  </BaseFilter>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue?: any | null,
}>(), { modelValue: undefined });

const emit = defineEmits(['update:modelValue', 'clear']);
</script>