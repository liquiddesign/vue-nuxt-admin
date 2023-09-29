<template>
  <BaseWrapper :wrap="wrap">
    <label v-if="label" :for="$attrs['id']">{{ label }}</label>
    <input v-bind="$attrs" type="file" @change="onFileChanged" class="form-control-file">
  </BaseWrapper>
</template>
<script setup lang="ts">

import VueMultiselect from "vue-multiselect";

const props = withDefaults(defineProps< {
  label? : string,
  wrap? : string,
}>(), { label: undefined, wrap : undefined });

defineOptions({
  inheritAttrs: false
})

function onFileChanged($event: Event){
  console.log($event);

  const target = $event.target as HTMLInputElement;
  console.log(target.files);
}
</script>