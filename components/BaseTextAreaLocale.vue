<template>
  <BaseTextArea :lang="language" :locale="true" v-bind="$attrs" :name="$attrs['name'] ? $attrs['name'] + '.' + language : undefined" :model-value="modelValue" @input="onChange" />
</template>

<script setup lang="ts">
import {inject} from 'vue';

const props = withDefaults(defineProps<{
  lang?: string
  modelValue?: string|null|any,
}>(), { modelValue: undefined, lang: undefined  });

defineOptions({
  inheritAttrs: false,
});

const form: any = inject('form', null) as any;


const $emit = defineEmits(['update:modelValue']);

const language = computed(() => {
  return form && form.lang.value ? form.lang.value : props.lang;
});

function onChange($event: any)
{
  $emit('update:modelValue', $event.target.value);
}

</script>