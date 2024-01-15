<template>
  <BaseWrapper :wrap="wrap">
    <label v-if="label !== null || $slots.default" :for="$attrs['id']" class="form-check-label">
      <input v-bind="$attrs" class="form-check-input" type="checkbox" :disabled="form?.disabled.value || $attrs['disabled']" :checked="form && name ? _get(form.data.value, name) : modelValue" @input="onChange">
      <span v-if="((form && form.lang) || lang) && locale" class="pe-1"><flag :iso="form && form.lang ? form.lang : lang" /></span> <span :class="{'text-black-50' : form?.disabled.value || $attrs['disabled']}">
      {{ label }}<slot/></span>
    </label>
    <input v-else v-bind="$attrs" class="form-check-input" type="checkbox" :disabled="form?.disabled.value || $attrs['disabled']" :checked="form && name ? _get(form.data.value, name) : modelValue" @input="onChange">
  </BaseWrapper>
</template>

<script setup lang="ts">
import {withDefaults} from 'vue/dist/vue';
import {inject} from 'vue';

const form: any = inject('form', null) as any;

const props = withDefaults(defineProps<{
  label?: string|null
  lang?: string
  locale?: boolean
  wrap?: string
  type?: string
  name?: string,
  modelValue?: boolean|null,
}>(), { type: 'text', wrap: undefined, lang: undefined, locale: false, label: null, name: undefined, modelValue: undefined });

defineOptions({
  inheritAttrs: false,
});

const $emit = defineEmits(['update:modelValue']);

function onChange($event: any) {

  if (form && props.name) {
    form.updateInput(props.name, $event.target.checked);
  }

  $emit('update:modelValue', $event.target.checked);
}



</script>