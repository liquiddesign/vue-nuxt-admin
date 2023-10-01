<template>
  <BaseWrapper :wrap="wrap">
    <label v-if="label !== null" :for="$attrs['id']">{{ label }}</label>
    <textarea v-bind="$attrs" class="form-control form-control-sm" :class="classes" :disabled="form?.disabled.value || $attrs['disabled']" @input="onChange">{{ form && name ? _get(form.input, name) : modelValue }}</textarea>
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
  nullable?: boolean
  name?: string
  modelValue?: string|null,
  validation?: BaseValidation,
}>(), { wrap: undefined, label: null, nullable: false, name: undefined, modelValue: undefined, validation: undefined });

defineOptions({
  inheritAttrs: false
});

const $emit = defineEmits(['update:modelValue'])

function onChange($event: any) {
  let value: string|number|null = $event.target.value;

  if (props.nullable && $event.target.value === '') {
    value = null;
  }

  if (form && props.name) {
    form.updateInput(props.name, value);
  }

  $emit('update:modelValue', value);
}

const {validationObject, classes} = useFormValidation(form, props);

</script>