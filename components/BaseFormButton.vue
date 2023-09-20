<template>
  <BaseWrapper :wrap="wrap">
    <button class="btn" :class="{'btn-sm': !large, 'btn-lg': large}" type="submit" :disabled="form.disabled.value || form.pending.value" v-bind="$attrs" @click="clicked = true; $parent.submit">
      <span v-if="form.pending.value && clicked" class="spinner-grow spinner-grow-xs me-1" role="status" aria-hidden="true" />
      <slot />
    </button>
  </BaseWrapper>
</template>

<script setup lang="ts">
import {inject, withDefaults} from 'vue';
import BaseWrapper from "./BaseWrapper.vue";

defineOptions({
  inheritAttrs: false
})

const clicked: Ref<boolean> = ref(false);

withDefaults(defineProps<{
  wrap?: string,
  large?: boolean,
}>(), {large: false, wrap: undefined,});

const form: any = inject('form') as any;

watch(form.pending, (value: boolean) => {
  if (!value) {
    clicked.value = false;
  }
})


</script>