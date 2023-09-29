<template>
  <BaseWrapper :wrap="wrap">
    <label v-if="label !== null" :for="$attrs['id']" class="form-check-label">
      <input v-bind="$attrs" class="form-check-input" type="checkbox" :disabled="form?.disabled.value || $attrs['disabled']" @input="onChange" :checked="form && name ? _get(form.input, name) : modelValue" />
      {{ label }}
    </label>
    <input v-else v-bind="$attrs" class="form-check-input" type="checkbox" :disabled="form?.disabled.value || $attrs['disabled']" @input="onChange" :checked="form && name ? _get(form.input, name) : modelValue" />
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
  name?: string,
  modelValue?: boolean|null,
}>(), { type: 'text', wrap: undefined, label: null, name: undefined, modelValue: undefined });

defineOptions({
  inheritAttrs: false
});

const $emit = defineEmits(['update:modelValue'])

function onChange($event: any) {

  if (form && props.name) {
    form.updateInput(props.name, $event.target.checked);
  }

  $emit('update:modelValue', $event.target.checked);
}



</script>