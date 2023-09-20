<template>
  <BaseWrapper :wrap="wrap">
    <button v-bind="$attrs" class="btn" :disabled="loading">
      <span v-if="loading" class="spinner-grow spinner-grow-xs me-1" role="status" aria-hidden="true" />
      <slot />
    </button>
  </BaseWrapper>
</template>

<script setup lang="ts">
import {withDefaults} from "vue/dist/vue";

const props = withDefaults(defineProps<{
  wrap?: string
  loading?: boolean
}>(), { loading: false });

defineOptions({
  inheritAttrs: false
});

</script>