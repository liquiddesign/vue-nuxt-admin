<template>
  <Popper v-if="confirmation" arrow :placement="confirmationPlacement">
    <BaseButton v-bind="$attrs" class="btn"><i class="fa fa-trash-o" /> <slot /></BaseButton>
    <template #content="{close}">
      Opravdu smazat?<br>
      <div class="text-center">
        <button class="btn btn-danger btn-xs" @click="close();$emit('confirm')">Ano</button>
        <button class="btn btn-light btn-xs ms-2" @click="close">Ne</button>
      </div>
    </template>
  </Popper>
  <BaseButton v-else v-bind="$attrs" class="btn"><i class="fa fa-trash-o" /> <slot /></BaseButton>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
  confirmation?: boolean
  confirmationPlacement?: string
}>(), { confirmation: false, confirmationPlacement: 'left' });

defineOptions({
  inheritAttrs: false,
});

const $emit = defineEmits(['confirm']);





</script>