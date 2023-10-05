<template>

    <BaseTextBox :lang="lang" :locale="true" v-bind="$attrs" :name="$attrs['name'] ? $attrs['name'] + '.' + lang : undefined" :model-value="modelValue" @input="onChange" />

</template>

<script setup lang="ts">
import {withDefaults} from "vue";

const props = withDefaults(defineProps<{
  lang: string
  langs: string[],
  modelValue?: string|null|any,
}>(), { modelValue: undefined  });

defineOptions({
  inheritAttrs: false,
});

const internalProperty = ref('');

const $emit = defineEmits(['update:modelValue']);

const test = computed({

  get() {
    return props.modelValue !== undefined ? props.modelValue?.[props.lang]  : undefined;
  },
  // setter
  set(newValue) {
    internalProperty.value = newValue
    // $emit('update:modelValue', props.modelValue !== undefined ? props.modelValue?.[props.lang]  : undefined);
  }


});

function onChange($event: any)
{
  $emit('update:modelValue', $event.target.value);
}

</script>