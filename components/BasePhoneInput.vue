<template>
  <BaseWrapper :wrap="wrap">
    <label v-if="label !== null" :for="$attrs['id']">
      <span v-if="((form && form.lang) || lang) && locale" class="pe-1"><BaseFlag :lang="form && form.lang.value ? form.lang.value : lang" /></span>{{ label }}
    </label>

    <vue-tel-input :dropdown-options="dropdownOptions" v-bind="$attrs" class="form-control form-control-sm" :class="{'is-invalid': !isValid}" value="+420724150005" :disabled="form?.disabled.value || $attrs['disabled']" @on-input="onChange" @validate="validate" />

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
  modelValue?: string|number|null,
  validation?: BaseValidation
  validationErrors?: ErrorObject[]
}>(), { label: null, lang: undefined, locale: false, wrap: undefined, name: undefined, modelValue: undefined, validation: undefined, validationErrors: undefined });

const isValid: Ref<boolean> = ref(false);
const dropdownOptions = {
  showDialCode: true,
  showFlags: true,
  showSearchBox: true,
  showDialCodeInSelection: true,
};

const {validationObject, classes} = useFormValidation(form, props);

function onChange(number, phoneObject) {
  if (form && props.name && phoneObject.number !== undefined) {
    form.updateInput(props.name, phoneObject.number);
  }

  //$emit('update:modelValue', phoneObject.number);
}

function validate(objInfo) {
  isValid.value = objInfo.valid;
}

</script>