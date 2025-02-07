<template>
  <BaseFilter @clear="emit('clear')">
    <slot />
    <BaseTextBox v-model="modelValue['f-name%']" wrap="flex-shrink-0" placeholder="Název" type="text" />
    <BaseMultiSelect v-model="modelValue['f-ribbons']" placeholder="Štítky" :multiple="true" wrap="flex-shrink-0" options-url="eshop/ribbon?property=name" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" style="min-width: 150px" />
    <BaseMultiSelect v-model="modelValue['f-discounts']" placeholder="Ceníky" :multiple="true" wrap="flex-shrink-0" options-url="eshop/pricelist?property=name" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" style="min-width: 150px" />
  </BaseFilter>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue?: any | null,
}>(), { modelValue: undefined });

const emit = defineEmits(['update:modelValue', 'clear']);
</script>