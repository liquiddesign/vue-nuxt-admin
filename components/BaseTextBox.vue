<template>
  <BaseWrapper :wrap="wrap">
    <label v-if="label !== null" :for="$attrs['id']">{{ label }}</label>
    <input v-bind="$attrs" class="form-control form-control-sm" :type="type === 'float' ? 'number' : type" :value="modelValue" :disabled="form?.disabled.value || $attrs['disabled']" @input="onChange" />
  </BaseWrapper>
</template>

<script setup lang="ts">
import {withDefaults} from "vue/dist/vue";
import {inject} from "vue";

const form: any = inject('form', null) as any;

const props = withDefaults(defineProps<{
  label?: string|null
  wrap?: string
  type?: string
  nullable?: boolean
  name?: string,
  modelValue?: string|null,
}>(), { type: 'text', wrap: undefined, label: null, nullable: false, name: undefined, modelValue: undefined });

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



</script>