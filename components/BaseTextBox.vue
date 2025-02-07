<template>
  <BaseWrapper :wrap="wrap">
    <label v-if="label !== null" :for="$attrs['id']">
      <span v-if="((form && form.lang) || lang) && locale" class="pe-1"><BaseFlag :lang="form && form.lang.value ? form.lang.value : lang" /></span>{{ label }}
    </label>
    <input v-bind="$attrs" class="form-control form-control-sm" :class="classes" :type="type === 'float' ? 'number' : type" :step="type === 'float' ? 0.01 : 1" :value="form && name ? _get(form.data.value, name) : modelValue" :disabled="form?.disabled.value || $attrs['disabled']" @input="onChange">

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
import {inject} from 'vue';
import {BaseValidation, ErrorObject} from '@vuelidate/core';

const form: any = inject('form', null) as any;

const props = withDefaults(defineProps<{
  label?: string|null
  lang?: string
  locale?: boolean
  required?: boolean
  wrap?: string
  type?: string
  nullable?: boolean
  name?: string,
  modelValue?: string|number|null,
  validation?: BaseValidation
  validationErrors?: ErrorObject[]
}>(), { type: 'text', wrap: undefined, label: null, lang: undefined, locale: false, nullable: false, name: undefined, modelValue: undefined, validation: undefined, validationErrors: undefined });

defineOptions({
  inheritAttrs: false,
});

const $emit = defineEmits(['update:modelValue']);


function onChange($event: any) {
  let value: string|number|null = $event.target.value;

  if (props.nullable && $event.target.value === '') {
    value = null;
  }

  if (props.type === 'number' && $event.target.value !== '') {
    value = parseInt($event.target.value);
  }

  if (props.type === 'float' && $event.target.value !== '') {
    value = parseFloat($event.target.value);
  }

  if (form && props.name) {
    form.updateInput(props.name, value);
  }

  $emit('update:modelValue', value);
}

const {validationObject, classes} = useFormValidation(form, props);


</script>