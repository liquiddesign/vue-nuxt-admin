<template>
  <BaseWrapper :wrap="wrap">
    <template v-for="(value, key) in options" :key="key">
      <input v-bind="$attrs" class="form-check-input" type="radio" :value="key" :disabled="form?.disabled.value || $attrs['disabled']" @input="onChange" :checked="(form && name ? _get(form.input, name) : modelValue) === key" />
      <label :for="$attrs['id']" class="form-check-label">{{ value }}</label>
    </template>
  </BaseWrapper>
</template>

<script setup lang="ts">
import {withDefaults} from "vue/dist/vue";
import {inject} from "vue";

const form: any = inject('form', null) as any;

const props = withDefaults(defineProps<{
  wrap?: string
  options: object
  name?: string,
  modelValue?: string|null,
}>(), { type: 'text', wrap: undefined, name: undefined, modelValue: undefined });

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



</script>