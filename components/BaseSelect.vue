<template>
  <BaseWrapper :wrap="wrap">
    <label v-if="label !== null" :for="$attrs['id']">
      <span v-if="(form && form.lang) || lang" class="pe-1"><flag :iso="form && form.lang ? form.lang : lang" /></span>{{ label }}
    </label>
    <select v-bind="$attrs" class="form-select form-select-sm" :class="classes" :disabled="form?.disabled.value || $attrs['disabled']" @input="onChange">
      <option v-if="prompt" value="" :selected="!(form && name ? _get(form.input, name) : modelValue)">{{ prompt }}</option>
      <option v-for="(value, key) in options" :key="key" :value="key" :selected="key === (form && name ? _get(form.input, name) : modelValue)">{{ value }}</option>
    </select>
    <template v-if="validationObject?.$errors">
      <div v-for="(error, index) in validationObject?.$errors" :key="index" class="text-danger">
        {{ error.$message }}
      </div>
    </template>
  </BaseWrapper>
</template>

<script setup lang="ts">
import {withDefaults} from "vue/dist/vue";
import {inject} from "vue";
import {BaseValidation} from "@vuelidate/core";

const form: any = inject('form', null) as any;

const props = withDefaults(defineProps<{
  label?: string|null
  lang?: string
  prompt?: string
  wrap?: string
  options: object
  name?: string
  modelValue?: string|null,
  validation?: BaseValidation,
}>(), { wrap: undefined, label: null,  lang: undefined, prompt: undefined, name: undefined, modelValue: undefined, validation: undefined });

defineOptions({
  inheritAttrs: false
});

const $emit = defineEmits(['update:modelValue'])

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