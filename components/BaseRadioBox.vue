<template>
  <BaseWrapper :wrap="wrap">
    <div :class="classes">
      <span v-if="((form && form.lang) || lang) && locale" class="pe-1"><flag :iso="form && form.lang ? form.lang : lang" /></span>
      <template v-for="(value, key) in options" :key="key">
        <input v-bind="$attrs" class="form-check-input" type="radio" :value="key" :disabled="form?.disabled.value || $attrs['disabled']" :checked="(form && name ? _get(form.data.value, name) : modelValue) === key" @input="onChange">
        <label :for="$attrs['id']" class="form-check-label">{{ value }}</label>
      </template>
    </div>
    <template v-if="validationObject?.$errors">
      <div v-for="(error, index) in validationObject?.$errors" :key="index" class="text-danger">
        {{ error.$message }}
      </div>
    </template>
  </BaseWrapper>
</template>

<script setup lang="ts">
import {withDefaults} from 'vue/dist/vue';
import {inject} from 'vue';
import {BaseValidation} from '@vuelidate/core';

const form: any = inject('form', null) as any;

const props = withDefaults(defineProps<{
  wrap?: string
  lang?: string
  locale?: boolean
  options: object
  name?: string,
  modelValue?: string|null,
  validation?: BaseValidation,
}>(), { type: 'text', wrap: undefined, lang: undefined, locale: false, name: undefined, modelValue: undefined, validation: undefined });

defineOptions({
  inheritAttrs: false,
});

const $emit = defineEmits(['update:modelValue']);

function onChange($event: any) {
  let value: string|number|null = $event.target.value;

  if ($event.target.value === '') {
    value = null;
  }

  if (form && props.name) {
    form.updateInput(props.name, value);
  }


  $emit('update:modelValue', value);
}

const {validationObject, classes} = useFormValidation(form, props);

</script>