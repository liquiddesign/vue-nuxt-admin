<template>
  <BaseFilter @clear="emit('clear')">
    <BaseTextBox v-model="modelValue['f-name%']" wrap="flex-shrink-0" placeholder="Název" type="text" />
    <BaseCurrencyDropdown class="me-1" :currency="currency" :currencies="currencies" @select="currency = $event" />
    <BaseMultiSelect v-model="modelValue['f-supplier']" placeholder="Zdroj" :multiple="true" wrap="flex-shrink-0" options-url="eshop/supplier?property=name" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" style="min-width: 250px" />
    <BaseMultiSelect v-model="modelValue['f-discounts']" placeholder="Akce" :multiple="true" wrap="flex-shrink-0" options-url="eshop/discount?property=name" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" style="min-width: 250px" />
  </BaseFilter>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue?: any | null,
}>(), { modelValue: undefined });

const { currency, currencies } = useTableVars();
const emit = defineEmits(['update:modelValue', 'clear']);
</script>