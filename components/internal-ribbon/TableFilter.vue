<template>
  <BaseFilter @cancel="emit('update:modelValue', {})">
    <BaseTextBox v-model="modelValue['f-name%']" wrap="flex-shrink-0" placeholder="Popisek" type="text" />
    <BaseMultiSelect v-model="modelValue['f-type%']" wrap="flex-shrink-0" placeholder="Typ" :options="typeOptions" />
  </BaseFilter>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue?: any | null,
}>(), { modelValue: undefined });

const emit = defineEmits(['update:modelValue']);

const typeOptions = {
  product: 'product',
  order: 'order',
  price_list: 'price_list',
};
</script>