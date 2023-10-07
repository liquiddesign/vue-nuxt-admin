<template>
  <input type="text" :value="modelValue" @input="onChange"/>
</template>

<script setup lang="ts">
import {withDefaults} from "vue/dist/vue";

const props = withDefaults(defineProps<{
  label?: string|null
  modelValue?: string|null|number
}>(), {label: undefined, modelValue: undefined });

defineOptions({
  inheritAttrs: false,
});

const $emit = defineEmits(['update:modelValue']);

function onChange($event: any) {
  $emit('update:modelValue', $event.target.value);
}


</script>