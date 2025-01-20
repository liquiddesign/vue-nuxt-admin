<script setup lang="ts">

withDefaults(defineProps<{
  modelValue?: any | null,
}>(), { modelValue: undefined });

const emit = defineEmits(['update:modelValue']);

</script>

<template>
  <BaseFilter @cancel="emit('update:modelValue', {})">
    <BaseTextBox v-model="modelValue['f-label%']" wrap="flex-shrink-0" placeholder="Popisek" type="text" />
    <BaseButton class="btn btn-sm btn-primary">Filtrovat</BaseButton>
  </BaseFilter>
</template>