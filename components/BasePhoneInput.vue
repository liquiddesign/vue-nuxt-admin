<template>
  <BaseWrapper :wrap="wrap">
    <label v-if="label !== null" :for="$attrs['id']">
      <span v-if="((form && form.lang) || lang) && locale" class="pe-1"><BaseFlag :lang="form && form.lang.value ? form.lang.value : lang" /></span>{{ label }}
    </label>
    <vue-tel-input v-model="phone" :dropdown-options="dropdownOptions" :input-options="inputOptions" v-bind="$attrs" class="form-control form-control-sm" :class="{'is-invalid': !isValid}" :disabled="form?.disabled.value || $attrs['disabled']" @on-input="onChange" @validate="validate" />

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
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
import {inject} from 'vue';
import {BaseValidation, ErrorObject} from '@vuelidate/core';

const form: any = inject('form', null) as any;
const $emit = defineEmits(['update:modelValue']);

const props = withDefaults(defineProps<{
  label?: string|null,
  lang?: string,
  locale?: boolean,
  wrap?: string,
  name: string,
  placeholder?: string,
  modelValue?: string|number|null,
  validation?: BaseValidation
  validationErrors?: ErrorObject[]
}>(), { label: null, lang: undefined, locale: false, wrap: undefined, name: undefined, placeholder: 'Telefonní číslo', modelValue: undefined, validation: undefined, validationErrors: undefined });

const isValid: Ref<boolean> = ref(false);

const dropdownOptions: object = {
  showDialCode: true,
  showFlags: true,
  showSearchBox: true,
  showDialCodeInSelection: true,
};

const inputOptions: object = {
  name: props.name,
  placeholder: props.placeholder,
};

const obj: Ref<any> = ref({
  formatted: '',
  nationalNumber: '',
  number: '',
  country: 'CZ',
  valid: isValid.value,
});

const phone: ComputedRef<string> = computed(() => {
  return obj.value?.formatted ? obj.value.formatted : _get(form.data.value, props.name);
});

const { validationObject } = useFormValidation(form, props);

function onChange(number: string, phoneObject: any) {
  const value: string|number|null = number;

  if (form && props.name) {
    form.updateInput(props.name, phoneObject.nationalNumber);
  }

  $emit('update:modelValue', value);
  obj.value = JSON.parse(JSON.stringify(phoneObject));
}

function validate(phoneObject: any) {
  isValid.value = phoneObject.valid;
}

</script>