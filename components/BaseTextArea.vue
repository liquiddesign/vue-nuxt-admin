<template>
  <BaseWrapper :wrap="wrap">
    <label v-if="label !== null" :for="$attrs['id']">{{ label }}</label>
    <textarea v-bind="$attrs" class="form-control form-control-sm" :disabled="form?.disabled.value || $attrs['disabled']" @input="onChange">{{ modelValue }}</textarea>
  </BaseWrapper>
</template>

<script setup lang="ts">
import {withDefaults} from "vue/dist/vue";
import {inject} from "vue";

const form: any = inject('form', null) as any;

const props = withDefaults(defineProps<{
  label?: string|null
  wrap?: string
  nullable?: boolean
  name?: string
  modelValue?: string|null,
}>(), { wrap: undefined, label: null, nullable: false, name: undefined, modelValue: undefined });

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



</script>