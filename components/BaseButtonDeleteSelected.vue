<template>
  <Popper v-if="confirmation" arrow placement="left">
    <BaseButton v-bind="$attrs" class="btn btn-outline-danger"><i class="fa fa-trash-o" /> <slot /></BaseButton>
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

withDefaults(defineProps<{
  confirmation?: boolean
}>(), { confirmation: false });

defineOptions({
  inheritAttrs: false,
});

const $emit = defineEmits(['confirm']);


</script>