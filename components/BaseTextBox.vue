<template>
  <BaseWrapper :wrap="wrap">
    <label v-if="label !== null" :for="$attrs['id']">{{ label }}</label>
    <input v-bind="$attrs" class="form-control form-control-sm" :class="classes" :type="type === 'float' ? 'number' : type" :value="form && name ? _get(form.input, name) : modelValue" :disabled="form?.disabled.value || $attrs['disabled']" @input="onChange" />
    <template v-if="validationObject?.$errors">
      <div v-for="(error, index) in validationObject?.$errors" :key="index" class="text-danger">
        {{ error.$message }}
      </div>
    </template>
  </BaseWrapper>
</template>

<script setup lang="ts">
import {withDefaults} from "vue/dist/vue";
import {computed, inject} from "vue";
import {BaseValidation} from "@vuelidate/core";

const form: any = inject('form', null) as any;



const props = withDefaults(defineProps<{
  label?: string|null
  wrap?: string
  type?: string
  nullable?: boolean
  name?: string,
  modelValue?: string|number|null,
  validation?: BaseValidation,
}>(), { type: 'text', wrap: undefined, label: null, nullable: false, name: undefined, modelValue: undefined, validation: undefined });

defineOptions({
  inheritAttrs: false
});

const $emit = defineEmits(['update:modelValue'])

function onChange($event: any) {
  let value: string|number|null = $event.target.value;

  if (props.nullable && $event.target.value === '') {
    value = null;
  }

  if (props.type === 'number') {
    value = parseInt($event.target.value);
  }

  if (props.type === 'float') {
    value = parseFloat($event.target.value);
  }

  if (form && props.name) {
    form.updateInput(props.name, value);
  }

  $emit('update:modelValue', value);
}

const {validationObject, classes} = useFormValidation(form, props);

/*const validationObject = computed( function () {
  return props.name && form?.validation.value ? form.validation.value[props.name] : props.validation;
});


const classes = computed( function () {
  return {
    'is-invalid' : validationObject.value?.$invalid && validationObject.value?.$dirty,
    'is-empty' : !props.modelValue,
    'input-required' : validationObject.value?.required,
  };
});*/


</script>