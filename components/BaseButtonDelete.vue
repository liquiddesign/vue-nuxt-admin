<template>
  <Popper v-if="confirmation" arrow placement="left">
    <BaseButton v-bind="$attrs" class="btn" :class="classes"><i class="fa fa-trash-o" /> <slot /></BaseButton>
    <template #content="{close}">
      Opravdu smazat?<br>
      <div class="text-center">
        <button class="btn btn-success btn-xs" @click="close();$emit('confirm')">Ano</button>
        <button class="btn btn-light btn-xs ms-2" @click="close">Ne</button>
      </div>
    </template>
  </Popper>
  <BaseButton v-else v-bind="$attrs" class="btn btn-danger"><i class="fa fa-trash-o" /> <slot /></BaseButton>
</template>

<script setup lang="ts">

import {withDefaults} from "vue";

const props = withDefaults(defineProps<{
  confirmation?: boolean
  outline?: boolean
}>(), { confirmation: false, outline: false });

defineOptions({
  inheritAttrs: false,
});

const $emit = defineEmits(['confirm']);

const classes = computed(() => {
  return !props.outline ? 'btn-danger' : 'btn-outline-danger';
});




</script>