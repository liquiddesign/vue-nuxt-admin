<template>
  <BaseButton class="btn" :class="classes"><i class="fa fa-edit" /> <slot /></BaseButton>
</template>

<script setup lang="ts">

import {withDefaults} from 'vue';

const props = withDefaults(defineProps<{
  outline?: boolean
}>(), { outline: false });

const classes = computed(() => {
  return !props.outline ? 'btn-success' : 'btn-outline-success';
});
</script>