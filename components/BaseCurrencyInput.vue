<template>
  <BaseWrapper :wrap="wrap">
    <label v-if="label !== null" :for="$attrs['id']">
      <span v-if="((form && form.lang) || lang) && locale" class="pe-1"><BaseFlag :lang="form && form.lang.value ? form.lang.value : lang" /></span>{{ label }}
    </label>
    <input ref="inputRef" v-bind="$attrs" class="form-control form-control-sm" :class="classes" :value="form && name ? _get(form.data.value, name) : modelValue" :disabled="form?.disabled.value || $attrs['disabled']" @input="onChange">

    <template v-if="validationErrors !== undefined">
      <div v-for="(error, index) in (validationErrors)" :key="index" class="text-danger">
        {{ error.$message }}
      </div>
    </template>
    <template v-else-if="validationObject?.$errors">
      <div v-for="(error, index) in (validationObject?.$errors)" :key="index" class="text-danger">
        {{ error.$message }}
      </div>
    </template>
  </BaseWrapper>
</template>

<script setup lang="ts">
import { useCurrencyInput } from 'vue-currency-input';
import {BaseValidation, ErrorObject} from '@vuelidate/core';
import {inject} from 'vue';

const props = withDefaults(defineProps<{
  label?: string|null,
  lang?: string,
  locale?: boolean,
  wrap?: string,
  name: string,
  currency?: string,
  precision?: number,
  min?: number,
  max?: number,
  modelValue?: number|null,
  validation?: BaseValidation
  validationErrors?: ErrorObject[]
}>(), { label: null, lang: undefined, locale: false, wrap: undefined, name: undefined, currency: 'CZK', precision: 0, min: undefined, max: undefined, modelValue: undefined, validation: undefined, validationErrors: undefined });

const options = {
  currency: props.currency,
  precision: props.precision,
  valueRange: { min: props.min, max: props.max },
};

const { inputRef, numberValue, formattedValue, setValue, setOptions } = useCurrencyInput(options);

setValue(0);

const form: any = inject('form', null) as any;
const $emit = defineEmits(['update:modelValue']);
const {validationObject, classes} = useFormValidation(form, props);

function onChange($event: any) {
  const value: number|null = $event.target.value;

  if (form && props.name) {
    form.updateInput(props.name, numberValue);
  }

  $emit('update:modelValue', value);
}

watch(() => props.currency, (value) => {
  setOptions({ currency: value });
});
</script>