<template>
  <input ref="inputRef" :value="formattedValue">
</template>

<script setup lang="ts">
import {useCurrencyInput} from 'vue-currency-input';


const props = defineProps<{
  modelValue: number|null,
}>();

const options = {
  currency: 'CZK',
};

const { inputRef, numberValue, setValue, formattedValue } = useCurrencyInput(options, false);



watch(() => props.modelValue, (value) => {
  setValue(value);
  console.log('aa');
});





</script>